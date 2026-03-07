export default function EmployerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Jobs Posted</h2>
          {/* <p className="text-3xl font-bold mt-2"></p> */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Candidates</h2>
          {/* <p className="text-3xl font-bold mt-2"></p> */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          {/* <h2 className="text-lg font-semibold"></h2> */}
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

      </div>
    </div>
  );
}