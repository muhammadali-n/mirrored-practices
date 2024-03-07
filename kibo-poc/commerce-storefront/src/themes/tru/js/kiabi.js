class App extends React.Component {
    componentDidMount() {
        (function () {
            var quotes = $(".quotes");
            var quoteIndex = -1;
            function showNextQuote() {
              ++quoteIndex;
              quotes.eq(quoteIndex % quotes.length)
                .fadeIn(1000)
                .delay(4000)
                .fadeOut(1000, showNextQuote);
            }
            showNextQuote();
        })();
    }
  }