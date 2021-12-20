namespace photobooth
{
    public static class Upload
    {
        public static async Task Request(HttpContext con)
        {
            if (!Directory.Exists("photos")) Directory.CreateDirectory("photos");
            FileStream fs = File.Create("photos/" + DateTime.Now.ToString("MM-dd-yyyy_hh-mm-ss") + ".png");
            await con.Request.BodyReader.CopyToAsync(fs);
            await fs.FlushAsync();
            fs.Close();
        }
    }
}