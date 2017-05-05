using germanWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB;
using Newtonsoft.Json;

namespace germanWebApp.Controllers
{
    public class HomeController : Controller
    {
       
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public object getNounsList(int number)
        {
            MongoDB MongoAccess = new MongoDB();
            List<DictionaryRowModels> wordList = MongoAccess.GetRows(number);
            var wordListJson = JsonConvert.SerializeObject(wordList);

            return wordListJson; 
        }
    }
}