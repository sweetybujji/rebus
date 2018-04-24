/**
 * @author Narendra
 * @created date 09/11/2017
 * @Modified By Narendra
 * @Modified Date 09/11/2017
 */

module.exports = function (app, passport, GoogleStrategy, postgresqlDBManager) {

    //@ google Credentials from google cloud platform
    var GOOGLE_CLIENT_ID = "791776436159-3hm9vp9nl3h3jrc4ecgp3fl5iqc4m9os.apps.googleusercontent.com"
      , GOOGLE_CLIENT_SECRET = "Sf-tOud31fhQY0rabXnItVUU";

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        //NOTE :
        //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
        //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/
        //then edit your /etc/hosts local file to point on your private IP.
        //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
        //if you use it.

        callbackURL: "http://localhost:8086/auth/google/callback",
        passReqToCallback: true

    },

   function (request, accessToken, refreshToken, profile, done) {
       try {
           console.log(profile);
           console.log(profile.emails[0].value);
           var EmailId = profile.emails[0].value;
           // asynchronous verification, for effect...
           process.nextTick(function () {

               var sel_qry = 'SELECT *  FROM public."Admin_M_Users" where "EmailId"=$1;';
               var sel_PolicyData = [EmailId];
               postgresqlDBManager.psql_getdata(sel_qry, sel_PolicyData, function (err, response) {

                   if (response.length > 0) {

                       console.log("ALready User is there");
                       // sess.RoleId = '2';
                   }
                   else {
                       var query = 'INSERT INTO public."Admin_M_Users"("EmailId", "EmployeeId", "Firstname", "Lastname", "Role", chk_active)VALUES ( $1, $2, $3, $4, $5, $6);';

                       var PolicyData = [profile.email, profile.id, profile.name.givenName, profile.name.familyName, '2', 'true'];
                       postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {

                           if (!err) {
                               // console.log("response" + response);
                               console.log("successfully inserted");
                           }
                           else {
                               console.log("No Recored Insereted" + err);
                           }
                       });


                   }
               });




               // To keep the example simple, the user's Google profile is returned to
               // represent the logged-in user.  In a typical application, you would want
               // to associate the Google account with a user record in your database,
               // and return that user instead.
               return done(null, profile);
           });
       } catch (e) {
           console.log("Error:" + "\t" + "PostbackGoogleStragery_function" + "\t" + e);
       }
   }
 ));


    // all environments
    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get('/auth/google', passport.authenticate('google', {
        scope: [
               'https://www.googleapis.com/auth/plus.login',
               'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }));
    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/Home',
                failureRedirect: '/'
            }));
};
