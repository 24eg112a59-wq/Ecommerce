import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/AuthContext';

const AdminUsersPage = () => {
  const { users } = useAuth();

  return (
    <div>
      <PageTitle eyebrow="Customers" title="All users" description="View the registered accounts in the ShopEZ demo app." />
      <div className="page-surface p-3 p-md-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge text-bg-dark text-uppercase">{user.role}</span></td>
                  <td>Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
