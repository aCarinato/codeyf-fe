import Link from 'next/link';
// packages
import { Icon } from '@iconify/react';

function AdminNotificationPage() {
  return (
    <div>
      <Link href="/my-profile/notifications">
        <p className="link-text">
          <Icon icon="akar-icons:arrow-back" /> Back to notifications page
        </p>
      </Link>
      <p>Notification</p>
    </div>
  );
}

export default AdminNotificationPage;
