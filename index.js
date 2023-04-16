const axios = require('axios').default;
const httpntlm = require('httpntlm');
const { default: cookieJarSupport } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

exports.getReport = async (req, res) => {
  const ssrsUrl = req.body.ssrs_url;
  const username = req.body.username;
  const password = req.body.password;
  const domain = req.body.domain;
  const reportPath = req.body.report_path;

  const loginUrl = `${ssrsUrl}/Reports/Pages/Report.aspx?ItemPath=${encodeURIComponent(reportPath)}&ViewMode=Detail`;

  const ntlmClient = axios.create();
  cookieJarSupport(ntlmClient);
  ntlmClient.defaults.jar = new CookieJar();

  try {
    await new Promise((resolve, reject) => {
      httpntlm.get(
        {
          url: loginUrl,
          username,
          password,
          domain,
          headers: {
            Connection: 'keep-alive'
          }
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    const reportUrl = `${ssrsUrl}/ReportServer?${encodeURIComponent(reportPath)}&rs:Command=Render&rs:Format=CSV`;
    const response = await new Promise((resolve, reject) => {
      httpntlm.get(
        {
          url: reportUrl,
          username,
          password,
          domain,
          responseType: 'arraybuffer',
          headers: {
            Connection: 'keep-alive'
          }
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    // console.log('Response headers:', response.headers);
    // console.log('Content length:', response.body.length);

    res.set('Content-Type', 'text/csv');
    res.send(Buffer.from(response.body));
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).send('Error fetching report');
  }
};
