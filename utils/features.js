class features{
      constructor(query, queryStr) {
            this.query = query;
            this.queryStr = queryStr
      }
      search() {
            const keyword = this.queryStr.keyword ? {
                  username: {
                        $regex: this.queryStr.keyword,
                        $options: "i",
                  }
            } : {}
            console.log(keyword)
            this.query = this.query.find({ ...keyword })
            return this
      }
}
module.exports = features