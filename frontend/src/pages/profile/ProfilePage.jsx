import PageTitle from '../../components/PageTitle';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { userOrders } = useStore();

  return (
    <div className="container py-5">
      <PageTitle eyebrow="Account" title="Profile" description="Review your ShopEZ account details." />
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="page-surface p-4">
            <h4 className="fw-bold mb-3">Account details</h4>
            <div className="mb-2"><strong>Name:</strong> {currentUser?.name}</div>
            <div className="mb-2"><strong>Email:</strong> {currentUser?.email}</div>
            <div className="mb-2"><strong>Role:</strong> {currentUser?.role}</div>
            <div><strong>Status:</strong> Active</div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="row g-3">
            <div className="col-md-4"><StatCard label="Orders" value={userOrders.length} caption="Placed by this account" /></div>
            <div className="col-md-4"><StatCard label="Wishlist" value="Coming" caption="Add when phase expands" /></div>
            <div className="col-md-4"><StatCard label="Support" value="24/7" caption="Demo contact center" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
