class LoginPage {
    // Constructor được gọi khi bạn tạo một đối tượng mới của lớp LoginPage
    // Nó nhận đối tượng 'page' của Playwright để có thể tương tác với trình duyệt
    constructor(page) {
        this.page = page; // Lưu trữ đối tượng 'page' để sử dụng trong các phương thức khác của lớp

        // Định nghĩa các 'locator' cho các phần tử trên trang đăng nhập
        // Mỗi dòng này tạo ra một 'biến' đại diện cho một phần tử UI cụ thể
        this.emailInput = page.locator('#email'); // Tìm phần tử có id="email" (trường email)
        this.passwordInput = page.getByLabel('Password'); // Tìm phần tử input có nhãn là "Password" (trường mật khẩu)
        this.signInButton = page.getByRole('button',{ name: 'Sign In' }); // Tìm một nút (button) có tên hiển thị là "Sign In"
        this.welcomeMessage = page.getByRole('banner').getByText('Welcome,', { exact: false }); // Tìm văn bản "Welcome," bên trong phần tử có vai trò 'banner' (thường là header), không yêu cầu khớp chính xác toàn bộ văn bản
        this.errorMessage = page.locator('.message-error'); // Tìm phần tử có class="message-error" (thông báo lỗi)
    }

    // Phương thức này điều hướng trình duyệt đến URL của trang đăng nhập
    async navigateToLogin() {
        await this.page.goto('https://magento.softwaretestingboard.com/customer/account/login/'); // 'await' để chờ trang tải xong
    }

    // Phương thức này thực hiện hành động đăng nhập
    // Nó nhận email và password làm tham số để có thể đăng nhập với các tài khoản khác nhau
    async login(email, password) {
        await this.emailInput.fill(email); // Điền email vào trường email
        await this.passwordInput.fill(password); // Điền password vào trường mật khẩu
        await this.signInButton.click(); // Nhấp vào nút đăng nhập
    }

    // Phương thức này kiểm tra xem thông báo chào mừng có hiển thị trên trang hay không
    async isWelcomeMessageVisible() {
        return await this.welcomeMessage.isVisible(); // Trả về true nếu hiển thị, false nếu không
    }

    // Phương thức này lấy nội dung văn bản của thông báo chào mừng
    async getWelcomeMessageText() {
        await this.welcomeMessage.waitFor({ state: 'visible' }); // Chờ cho phần tử hiển thị trước khi lấy văn bản
        return await this.welcomeMessage.textContent(); // Trả về nội dung văn bản của phần tử
    }

    // Phương thức này kiểm tra xem thông báo lỗi có hiển thị trên trang hay không
    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible(); // Trả về true nếu hiển thị, false nếu không
    }

    // Phương thức này lấy nội dung văn bản của thông báo lỗi
    async getErrorMessageText() {
        await this.errorMessage.waitFor({ state: 'visible' }); // Chờ cho phần tử hiển thị trước khi lấy văn bản
        return await this.errorMessage.textContent(); // Trả về nội dung văn bản của phần tử
    }
}

module.exports = LoginPage; // Xuất lớp LoginPage để các file test có thể import và sử dụng