import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>สวัสดี คุณ {userService.userValue?.firstName} ยินดีต้อนรับ</h1>
                <p>สามารถจัดการสมาชิกได้ที่นี่</p>
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );
}
