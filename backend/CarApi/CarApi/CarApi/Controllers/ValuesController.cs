using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CarApi.Controllers
{
	public class JsonHelper
	{
		/// <summary>
		/// JSON Serialization
		/// </summary>
		public static string JsonSerializer<T>(T t)
		{
			DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
			MemoryStream ms = new MemoryStream();
			ser.WriteObject(ms, t);
			string jsonString = Encoding.UTF8.GetString(ms.ToArray());
			ms.Close();
			return jsonString;
		}
		/// <summary>
		/// JSON Deserialization
		/// </summary>
		public static T JsonDeserialize<T>(string jsonString)
		{
			DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
			MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
			T obj = (T)ser.ReadObject(ms);
			return obj;
		}
	}

	[Route("api/[controller]")]
    public class ValuesController : Controller
    {
		// GET api/values
		[EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
		[HttpGet]
        public String Get()
        {
			//return new string[] { "value1", "value2", "value2", "value2" };
			var webClient = new WebClient();
			String rawJson = webClient.DownloadString(@"D:\Learning\Asp_net\web_api\CarApi\CarApi\car_data.json");
			return rawJson;
		}

		// GET api/values/5
		//[EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
		[HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

		// POST api/values
		[EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
		[System.Web.Http.AllowAnonymous]
		[HttpPost]
        //public List<Item> Post (List<Item>  item)
        public string Post (Item item)
		{

			////string json = "thanks";
			////write string to file
			string str = "";
			var webClient = new WebClient();
			string rawJson = webClient.DownloadString(@"D:\Learning\Asp_net\web_api\CarApi\CarApi\car_data.json");
			List<Item> items = JsonHelper.JsonDeserialize<List<Item>>(rawJson);
			if (item.flag == "add")
			{
				items.Add(item);
				str = JsonConvert.SerializeObject(items);
				System.IO.File.WriteAllText(@"D:\Learning\Asp_net\web_api\CarApi\CarApi\car_data.json", str);
			}
			else if (item.flag == "edit")
			{
				foreach (Item ii in items.Where(w => w.id == item.id))
				{
					ii.manufacturer = item.manufacturer;
					ii.make = item.make;
					ii.model = item.model;
					ii.year = item.year;
				}
				str = JsonConvert.SerializeObject(items);
				System.IO.File.WriteAllText(@"D:\Learning\Asp_net\web_api\CarApi\CarApi\car_data.json", str);
			}
			else if (item.flag == "delete")
			{
				items.RemoveAll(x => x.id== item.id);
				str = JsonConvert.SerializeObject(items);
				System.IO.File.WriteAllText(@"D:\Learning\Asp_net\web_api\CarApi\CarApi\car_data.json", str);
			}


			return str;
        }
 
		// PUT api/values/5
		[EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
		[HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {

        }

		// DELETE api/values/5
		[EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
		[HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }

	public class Item
	{
		public int id { get; set; }
		public string flag { get; set; }
		public string manufacturer { get; set; }
		public string make { get; set; }
		public string model { get; set; }
		public decimal year { get; set; }
	}


}
