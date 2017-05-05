using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(germanWebApp.Startup))]
namespace germanWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
