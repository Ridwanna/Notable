const ObjecID =  require('mongodb').ObjectID;

module.exports = (app, db) => {

// get request
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjecID(id)};
        db.db().collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occurrd'});
            } else {
                res.send(item);
            }
        });
    });

// delete request
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjecID(id)};
        db.db().collection('notes').deleteOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occurrd'});
            } else {
                res.send('Note ' + id + ' deleted!' );
            }
        });
    });

// update/put request
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjecID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.db().collection('notes').updateOne(details, note, (err, item) => {
            if(err){
                res.send({'error': 'An error has occurrd'});
            } else {
                res.send(item);
            }
        });
    });

    // post request
    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        db.db().collection('notes').insertOne(note, (err, results) => {
           if(err){
               res.send({'error': 'An error has occurrd'});
           } else {
               res.send(results.ops[0]);
           }
       });
    });
};