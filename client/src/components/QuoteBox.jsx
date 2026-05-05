function QuoteBox({ quote, loading, onNewQuote }) {
  if (loading) {
    return (
      <div className="quote-box">
        <p>Loading inspirational quote...</p>
      </div>
    );
  }

  return (
    <div className="quote-box">
      <p>"{quote.text}"</p>
      <p><strong>- {quote.author}</strong></p>

      <button className="new-quote-btn" onClick={onNewQuote}>
        New Quote
      </button>
    </div>
  );
}

export default QuoteBox;