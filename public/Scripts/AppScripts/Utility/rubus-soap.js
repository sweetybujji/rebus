//var soap = require('strong-soap').soap;

/**
 * @summary Get data from soap Service
 * @param URl:It Should contains Method Name. Eg:http://www.webservicex.com/globalweather.asmx?wsdl
 * @param requestArgs Eg:requestArgs = { CityName: 'Hyderabad',  CountryName: 'Us'};
 * @param Methods (It should be separated by Symbol(,)) Eg:'GlobalWeather,GlobalWeatherSoap,GetCitiesByCountry'
 * @param callback (function call)
 * @returns result (or) error
 * functioncode:rubus-soap_0001
 */
var options = {};
exports.GetDataFromSoapservice = function (URl, requestArgs, Methods, callback) {

    try {
        soap.createClient(URl, options, function (err, client) {
            if (!err) {
                var mm = Methods.split(",")
                for (var i = 0; i < mm.length; i++) {
                    client = client[mm[i]];
                }
                //var method = client['GlobalWeather']['GlobalWeatherSoap']['GetCitiesByCountry'];
                var method = client;
                method(requestArgs, function (er, result, envelope, soapHeader) {
                    if (!err) {
                        callback(false, JSON.stringify(result));
                    } else {                        
                        callback(er, er.message);
                    }
                });
            }
            else {
                callback(err, err.message);
            }
        });
    }
    catch (error) {
        callback(error, error.message);
    }
}



//.................................................................  Soap Start  .........................................................................................................

//...........  Soap Connectivity sample methods and input parameters........///

////Get The data from Soap Service  Start
//var requestArgs = {
//    //CityName: 'Hyderabad',
//    CountryName: 'Us'
//};

//var Methods = 'GlobalWeather,GlobalWeatherSoap,GetCitiesByCountry';

//var options = {};

//soap_Custom.GetDataFromSoapservice("http://www.webservicex.com/globalweather.asmx?wsdl", requestArgs, Methods, function (err, res) {
//    console.log(res);
//});

////Get The data from Soap Service  End


////.................................................................  Soap End  .........................................................................................................

