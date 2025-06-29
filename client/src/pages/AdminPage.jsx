const AdminPage = () => {
  return (
    <div className="admin-dashboard">
      <nav>
        <ul>
          <li><a href="#">Users</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Analytics</a></li>
        </ul>
      </nav>
      <main>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
      </main>
    </div>
  );
}
 
export default AdminPage;