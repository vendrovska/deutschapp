using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace germanWebApp.Models
{
    public class DictionaryRowModels
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string GermanNoArticle { get; set; }
        public string FullGermanForm { get; set; }
        public string English { get; set; }
        public string Article { get; set; }
        public int AlphabetOrder { get; set; }
        public int RandomNumber { get; set; }
    }
}