import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
const app = express();

let admin = {
    id: 1,
    email: "kushal@123",
    password: "1234"
};

// PostgreSQL database configuration
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "gowda99",
    port: 4000
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("home.ejs");
});
app.get("/logstd", (req, res) => {
    res.render("stdlogin.ejs");
});
app.get("/regstd", (req, res) => {
    res.render("stdregister.ejs");
});
app.get("/logfac", (req, res) => {
    res.render("faclogin.ejs");
});
app.get("/regfac", (req, res) => {
    res.render("facregister.ejs");
});
app.get("/admin", (req, res) => {
    res.render("admin.ejs");
});
app.get("/approveClub", async (req, res) => {
    const result = await db.query("SELECT * FROM req");
    res.render("admhome.ejs", { clubs: result.rows });

})
app.get("/clubregistration", (req, res) => {
    res.render("clubregistration.ejs")
})
app.get("/registration", async (req, res) => {
    const b = await db.query("SELECT * FROM clubnames");
    const c = b.rows;
    res.render("fachome.ejs", { clubs: c });
    res.redirect("/")
})
// Route to render the announcement page
app.get('/addAnnouncement', async (req, res) => {
    try {
        const result = await db.query('SELECT id, title FROM announcements');
        res.render('announcement.ejs', { announcements: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving announcements");
    }
});
app.get('/viewAnnouncements', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM announcements');
        res.render('generalannouncement.ejs', { announcements: result.rows }); // Make sure you're passing 'announcements'
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

// Route to add a new announcement
app.post('/addAnnouncement', async (req, res) => {
    const { title } = req.body;
    try {
        await db.query('INSERT INTO announcements (title) VALUES ($1)', [title]);
        res.redirect('/approveClub');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding announcement");
    }
});

//clubregistration------->
app.get("/clubs/kv", async (req, res) => {
    res.render("kv.ejs")
})
app.get("/clubs/iste", async (req, res) => {
    res.render("iste.ejs")
})
app.get("/clubs/iet", async (req, res) => {
    res.render("iet.ejs")
})
app.get("/numberofreg", async (req, res) => {
    res.render("download.ejs")
})
app.get('/downloadClubRegistrations/:clubname', async (req, res) => {
    const clubname = req.params.clubname.toUpperCase();

    const clubTableMap = {
        'WEC': 'wec_registrations',
        'IEEE': 'ieee_registrations',
        'IET': 'iet_registrations',
        'KV': 'kv_club_registrations',
        'ISTE': 'iste_registrations',
        'PHOTOGRAPHY': 'photography_registrations'
    };

    const tableName = clubTableMap[clubname];
    if (!tableName) {
        return res.status(404).send("Club not found");
    }

    try {
        // Query to get the registration details for the specific club
        const result = await db.query(`SELECT name, year, branch FROM ${tableName}`);
        const data = result.rows;

        // Check if data is empty
        if (data.length === 0) {
            return res.status(404).send(`No registrations found for ${clubname}`);
        }

        // Create CSV content
        let csvContent = `Club: ${clubname}\nStudent Name, Year, Branch\n`;
        data.forEach(row => {
            csvContent += `${row.name}, ${row.year}, ${row.branch}\n`;
        });

        // Set headers for file download
        res.header('Content-Type', 'text/csv');
        res.attachment(`${clubname}_registrations.csv`);
        return res.send(csvContent);

    } catch (err) {
        console.error("Error generating CSV report:", err);
        res.status(500).send("An error occurred while generating the report.");
    }
});

app.post("/clubs/kv/register", async (req, res) => {
    const { name, year, branch } = req.body;
    const username = req.body.name;

    try {

        await db.query("DELETE FROM clubs WHERE clubname = $1", ['KV']);
        console.log("'clubs/kv' deleted successfully");
        await db.query("INSERT INTO kv_club_registrations (name, year, branch) VALUES ($1, $2, $3)", [name, year, branch]);
        const clubResult = await db.query("SELECT * FROM clubs");
        const clubs = clubResult.rows;
        res.render("stdhome.ejs", {
            name: username,  // Pass the registered user's name
            clubs: clubs     // Pass the fetched clubs
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/clubs/iet/register", async (req, res) => {
    const { name, year, branch } = req.body;
    const username = req.body.name;

    try {
        const existingClub = await db.query("SELECT * FROM clubs WHERE clubname = $1", ['clubs/iet']);
        if (existingClub.rows.length === 0) {
            console.log("Club 'clubs/kv' not found in the clubs table");
            return res.status(404).send("Club not found.");
        }
        await db.query("DELETE FROM clubs WHERE clubname = $1", ['IET']);
        console.log("'clubs/iet' deleted successfully");
        await db.query("INSERT INTO iet_club_registrations (name, year, branch) VALUES ($1, $2, $3)", [name, year, branch]);
        const clubResult = await db.query("SELECT * FROM clubs");
        const clubs = clubResult.rows;
        res.render("stdhome.ejs", {
            name: username,  // Pass the registered user's name
            clubs: clubs     // Pass the fetched clubs
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/clubs/wec/register", async (req, res) => {
    const { name, year, branch } = req.body;
    const username = req.body.name;

    try {

        await db.query("DELETE FROM clubs WHERE clubname = $1", ['WEC']);
        console.log("'clubs/wec' deleted successfully");
        await db.query("INSERT INTO wec_club_registrations (name, year, branch) VALUES ($1, $2, $3)", [name, year, branch]);
        const clubResult = await db.query("SELECT * FROM clubs");
        const clubs = clubResult.rows;
        res.render("stdhome.ejs", {
            name: username,  // Pass the registered user's name
            clubs: clubs     // Pass the fetched clubs
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/clubs/IEEE/register", async (req, res) => {
    const { name, year, branch } = req.body;
    const username = req.body.name;
    try {
        await db.query("DELETE FROM clubs WHERE clubname = $1", ['IEEE']);
        console.log("'clubs/kv' deleted successfully");
        await db.query("INSERT INTO ieee_club_registrations (name, year, branch) VALUES ($1, $2, $3)", [name, year, branch]);
        const clubResult = await db.query("SELECT * FROM clubs");
        const clubs = clubResult.rows;
        res.render("stdhome.ejs", {
            name: username,  // Pass the registered user's name
            clubs: clubs     // Pass the fetched clubs
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/registration", async (req, res) => {
    const clubname = req.body.clubname;
    const date = req.body.deadline;
    const a = true;
    try {
        await db.query("INSERT INTO req (clubname, date) VALUES ($1, $2)", [clubname, date]);
        res.send("Thanku for registration")


    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/regstd", async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;

    try {
        const result = await db.query("SELECT * FROM student WHERE email=$1", [username]);

        if (result.rowCount > 0) {
            res.send("Email already exists. Try logging in.");
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.error("Error in hashing");
                    res.status(500).send("Error hashing the password");
                } else {
                    // Insert the student into the database
                    await db.query("INSERT INTO student (email, password) VALUES ($1, $2)", [username, hash]);

                    // Fetch clubs after registration
                    const clubResult = await db.query("SELECT * FROM clubs");
                    const clubs = clubResult.rows; // Corrected to use the fetched rows

                    // Render the student's home page with the username and clubs
                    res.render("stdhome.ejs", {
                        name: username, // Pass the username correctly
                        clubs: clubs    // Pass the clubs correctly
                    });
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/logstd", async (req, res) => {
    const logemail = req.body.name;
    const logpassword = req.body.password;

    try {
        const logresult = await db.query("SELECT * FROM student WHERE email=$1", [logemail]);

        if (logresult.rowCount === 0) {
            res.send("Please register first before logging in.");
        } else {
            const user = logresult.rows[0];
            const storedpassword = user.password;

            bcrypt.compare(logpassword, storedpassword, async (err, result) => {
                if (err) {
                    console.error("Error comparing the password.");
                    res.status(500).send("Error comparing the password");
                } else {
                    if (result) {
                        // Fetch clubs after successful login
                        const clubResult = await db.query("SELECT * FROM clubs");
                        const clubs = clubResult.rows; // Corrected to use the fetched rows

                        // Render the student's home page with the username and clubs
                        res.render("stdhome.ejs", {
                            name: logemail,  // Corrected to pass the correct logged in email
                            clubs: clubs     // Pass the clubs correctly
                        });
                    } else {
                        res.send("Incorrect password.");
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error while checking user registration:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Faculty registration

app.post("/regfac", async (req, res) => {
    const conveyor = req.body.name;
    const conveyorpass = req.body.password;

    try {
        const result = await db.query("SELECT * FROM conveyor WHERE email=$1", [conveyor]);

        if (result.rowCount > 0) {
            res.send("Email already exists. Try logging in.");
        } else {
            bcrypt.hash(conveyorpass, 10, async (err, hash) => {
                if (err) {
                    console.error("Error in hashing");
                } else {
                    await db.query("INSERT INTO conveyor (email, password) VALUES ($1, $2)", [conveyor, hash]);
                    const b = await db.query("SELECT * FROM clubnames");
                    const c = b.rows;
                    res.render("fachome.ejs", { clubs: c });

                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// Faculty login
app.post("/logfac", async (req, res) => {
    const logemail = req.body.name;
    const logpassword = req.body.password;

    try {
        const logresult = await db.query("SELECT * FROM conveyor WHERE email=$1", [logemail]);

        if (logresult.rowCount === 0) {
            // Redirect to registration page if no account exists
            res.redirect("/regfac?message=Please register before login");
        } else {
            const user = logresult.rows[0];
            const storedpassword = user.password;

            // Compare the entered password with the stored password hash
            bcrypt.compare(logpassword, storedpassword, async (err, result) => {
                if (err) {
                    console.error("Error comparing the password.");
                    res.status(500).send("Error while logging in.");
                } else {
                    if (result) {
                        try {
                            // If password matches, fetch club data and render the page
                            const b = await db.query("SELECT * FROM clubnames");
                            const c = b.rows;
                            res.render("fachome.ejs", { clubs: c });
                        } catch (err) {
                            console.error("Error fetching clubs:", err);
                            res.status(500).send("Error fetching clubs.");
                        }
                    } else {
                        res.send("Incorrect password.");
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error while checking user registration:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Admin login
app.post("/admin", async (req, res) => {
    const logemail = req.body.name;
    const logpassword = req.body.password;

    // Replace with your admin credentials logic
    if (logemail === admin.email && logpassword === admin.password) {
        try {
            // Fetch all pending clubs from the "req" table
            const result = await db.query("SELECT * FROM req");

            // Render the admin home page with the pending clubs
            res.render("admhome.ejs", { clubs: result.rows });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.redirect("/");
    }
});
app.post("/approveClub", async (req, res) => {
    const clubId = req.body.clubId;

    try {

        const clubResult = await db.query("SELECT * FROM req WHERE id = $1", [clubId]);
        const club = clubResult.rows[0];

        if (club) {

            await db.query("INSERT INTO clubs (id, clubname, date) VALUES ($1, $2, $3)", [club.id, club.clubname, club.date]);


            await db.query("DELETE FROM req WHERE id = $1", [clubId]);
        }


        res.redirect("/approveClub");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/denyClub", async (req, res) => {
    const clubId = req.body.clubId;

    try {

        await db.query("DELETE FROM req WHERE id = $1", [clubId]);
        res.redirect("/approveClub");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});
