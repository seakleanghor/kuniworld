const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const universities = require('./data/universities.json');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/universities', (req, res) => {

    let filtered = universities;

    const keyword = req.query.keyword;

    if (keyword) {

        filtered = universities.filter(university =>
            university.name.toLowerCase().includes(keyword.toLowerCase()) ||
            university.location.toLowerCase().includes(keyword.toLowerCase())
        );

    }

    res.render('universities', {
        universities: filtered
    });

});

app.get('/university/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const university = universities.find(
        u => u.id === id
    );

    res.render('university', { university });

});

app.get('/consultant', (req, res) => {
    res.render('consultant');
});

app.get('/consultant-result', (req, res) => {

    const location = req.query.location;
    const topik = req.query.topik;
    const major = req.query.major;

    let recommendations = universities.filter(
        university =>
            university.location === location &&
            university.major === major &&
            university.topik === topik
    );

    if (recommendations.length === 0) {

        recommendations = universities.filter(
            university =>
                university.location === location &&
                university.major === major
        );

    }
    if (recommendations.length === 0) {

    recommendations = universities.filter(
        university =>
            university.location === location
    );
}

    res.render('consultant-result', {
        recommendations,
        location,
        topik,
        major
    });

});

app.get('/timeline', (req, res) => {
    res.render('timeline');
});

app.get('/comparison', (req, res) => {

    const id1 = parseInt(req.query.uni1);
    const id2 = parseInt(req.query.uni2);

    const university1 = universities.find(
        u => u.id === id1
    );

    const university2 = universities.find(
        u => u.id === id2
    );

    res.render('comparison', {
        universities,
        university1,
        university2
    });

});

app.get('/scholarships', (req, res) => {
    res.render('scholarships');
});

app.get('/calculator', (req, res) => {
    res.render('calculator');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});