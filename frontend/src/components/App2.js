
function setStateCards(card, newCard) {
  setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
}


function handleCardDeleteId(card) {
  setIsLoad(true);
  api
    .deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoad(false);
    });
}






