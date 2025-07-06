import { FilterQuery, Query } from "mongoose";

/**
 * MongooseQueryBuilder
 *
 * A flexible builder class for constructing complex Mongoose queries
 * with features like search, filter, sort, pagination, and field selection.
 *
 * Usage:
 *   const qb = new MongooseQueryBuilder(Model.find(), req.query);
 *   await qb.search([...]).filter().sort().paginate().fields();
 *   const results = await qb.modelQuery;
 *   const pagination = await qb.countTotal();
 */
class MongooseQueryBuilder<T> {
  // The Mongoose query being built
  public queryModel: Query<T[], T>;

  // Raw query parameters from the request (e.g., req.query)
  public query: Record<string, unknown>;

  /**
   * Constructor
   * @param modelQuery - A Mongoose find() query
   * @param query - The request query parameters
   */
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = modelQuery;
    this.query = query;
  }

  /**
   * Adds a case-insensitive search across specified fields using $regex.
   * Example: ?search=John
   * @param searchableFields - Fields to search in (e.g., ['name', 'email'])
   */
  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  /**
   * Filters results based on query parameters excluding reserved keywords.
   * Example: ?role=admin&active=true
   */
  filter() {
    const queryObj = { ...this.query };

    // Remove reserved params not meant for filtering
    const excludeFields = ["search", "sort", "size", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Apply filter conditions
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  /**
   * Sorts the results based on query parameters.
   * Example: ?sort=name,-createdAt
   * Default: -createdAt (descending)
   */
  sort() {
    const sortParam = this.query?.sort as string;
    const order = this.query?.order as string;

    if (sortParam) {
      if (order) {
        // Simple one-field sort with order
        const sortOrder = order === "asc" ? 1 : -1;
        this.queryModel = this.queryModel.sort({ [sortParam]: sortOrder });
      } else {
        // Multi-field sort with optional '-' prefix
        const sort = sortParam.split(",").join(" ");
        this.queryModel = this.queryModel.sort(sort);
      }
    } else {
      this.queryModel = this.queryModel.sort("-createdAt");
    }

    return this;
  }

  /**
   * Applies pagination to the query.
   * Example: ?page=2&size=10
   * Default: page 1, size 10
   */
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const size = Number(this?.query?.size) || 10;
    const skip = (page - 1) * size;

    this.queryModel = this.queryModel.skip(skip).limit(size);

    return this;
  }

  /**
   * Selects specific fields to include in the results.
   * Example: ?fields=name,email
   * Default: exclude __v
   */
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.queryModel = this.queryModel.select(fields);
    return this;
  }

  /**
   * Calculates pagination metadata (total count, total pages, etc.)
   * Returns an object with pagination details for the client.
   */
  async countTotal() {
    // Get current filter conditions
    const totalQueries = this.queryModel.getFilter();

    // Count total matching documents
    const total = await this.queryModel.model.countDocuments(totalQueries);

    const page = Number(this?.query?.page) || 1;
    const size = Number(this?.query?.size) || 10;
    const totalPage = Math.ceil(total / size);

    return {
      page,
      size,
      total,
      totalPage,
    };
  }
}

export default MongooseQueryBuilder;
