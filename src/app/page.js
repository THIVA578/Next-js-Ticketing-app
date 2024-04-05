import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className=" p-5">
      {console.log(uniqueCategories)}
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => {
            return (
              <div key={categoryIndex} className="mb-4">
                <h2>{uniqueCategory}</h2>
                <div className=" grid-cols-2 lg:grid xl:grid-cols-4">
                  {tickets
                    .filter((ticket) => ticket.category === uniqueCategory)
                    .map((filteredTicket, _index) => (
                      <TicketCard
                        id={_index}
                        key={_index}
                        ticket={filteredTicket}
                      />
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
