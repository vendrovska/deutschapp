using System;
using System.Collections.Generic;
using System.Linq;
using germanWebApp.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace germanWebApp
{
    public class MongoDB
    {
        public MongoDatabase mongoDatabase;
        //   public async System.Threading.Tasks.Task<List<DictionaryRowModels>> GetRows()
        public List<DictionaryRowModels> GetRows(int startIndex)
        {
            int bottomLimit = startIndex;
            //if (bottomLimit > 1)
            //{
            //    bottomLimit = bottomLimit*5;  //20; TODO change back for prod
            //}

            int upperLimit = bottomLimit + 5; //20; TODO change back for prod
            mongoDatabase = ConnectToMongohqDb();
  
            List<DictionaryRowModels> filteredByRange = new List<DictionaryRowModels>();

            /* GET ALL ROWS FROM COLLECTION*/
            //var queryResult = mongoDatabase.GetCollection("thousandNouns").FindAll().AsEnumerable();
            //List<DictionaryRowModels> rowList = new List<DictionaryRowModels>();
            //rowList = (from row in queryResult
            //           select new DictionaryRowModels
            //           {
            //               Id = (ObjectId)row["_id"],
            //               GermanNoArticle = row["GermanNoArticle"].AsString,
            //               English = row["English"].AsString,
            //               Article = row["Article"].AsString,
            //               AlphabetOrder = Convert.ToInt32(row["AlphabetOrder"]),
            //               RandomNumber = Convert.ToInt32(row["RandomNumber"])
            //           }).ToList();

            IMongoQuery query = Query.And(
                Query.GTE("RandomNumber", bottomLimit),
                Query.LT("RandomNumber", upperLimit)
                );
            var result = mongoDatabase.GetCollection("thousandNouns").Find(query);
            filteredByRange = (from row in result
                               
                        select new DictionaryRowModels
                        {
                            Id = (ObjectId)row["_id"],
                            GermanNoArticle = row["GermanNoArticle"].AsString.Substring(0,row["GermanNoArticle"].AsString.IndexOf(",")).ToUpper(),
                            English = row["English"].AsString,
                            Article = row["Article"].AsString,
                            AlphabetOrder = Convert.ToInt32(row["AlphabetOrder"]),
                            RandomNumber = Convert.ToInt32(row["RandomNumber"]),
                            FullGermanForm = row["Article"].AsString.ToUpper() +" "+ row["GermanNoArticle"].AsString.Substring(0, row["GermanNoArticle"].AsString.IndexOf(",")).ToUpper()
                        }).ToList();
            return filteredByRange;
        }
        private MongoDatabase ConnectToMongohqDb()
        {
            MongoClient mongoClient = new MongoClient(
                new MongoUrl(@"mongodb://germanappUser:user123@ds030719.mlab.com:30719/germanappdb"));
            MongoServer server = mongoClient.GetServer();
            return mongoClient.GetServer().GetDatabase("germanappdb");
        }
    }
}