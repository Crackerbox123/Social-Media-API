const { Thought, User } = require('../models');


const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find({})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
    .then(dbOneThoughtData => {
      if (!dbOneThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' })
        return;
      }
      res.json(dbOneThoughtData);
    }) 
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },


  addThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id! '})
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }, 

 
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
    .then(dbUpdatedThoughtData => {
      if(!dbUpdatedThoughtData) {
        res.status(404).json({ message: 'No thoughts with this id found!' });
        return;
      }
      res.json(dbUpdatedThoughtData);
    })
    .catch(err => res.json(err));
  },

  // DELETE thought by _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbDeletedData => {
      if(!dbDeletedData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbDeletedData);
    })
    .catch(err => res.json(err));
  },

  
  
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with this id' });
        return;
      }
      res.json(dbThoughtData);
    }) 
    .catch(err => res.json(err));
  },  

  deleteReaction({ params }, res) {
    console.log('delete reactions params:', params)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  }
}

module.exports = thoughtController;