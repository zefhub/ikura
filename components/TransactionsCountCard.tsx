const TransactionsCountCard: React.FC = () => {
  return (
    <div className="col-12 col-lg-6 col-xl">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">
                Count Purchases
              </h6>
              <span className="h2 mb-0">237</span>
            </div>
            <div className="col-auto">
              <span className="h2 fe fe-clock text-muted mb-0"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsCountCard;
