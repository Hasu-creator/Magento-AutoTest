// tests/signup.spec.js

const { test, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage'); // Nhập lớp SignupPage

test.describe('Kiểm thử Đăng ký Khách hàng trên Magento', () => {
    let signupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        await signupPage.navigatetoSignup();
    });

    test('Nên cho phép khách hàng đăng ký tài khoản thành công', async ({ page }) => {
        // Tạo dữ liệu ngẫu nhiên để tránh trùng email khi chạy lại test
        const timestamp = Date.now();
        const email = `testuser${timestamp}@example.com`;
        const password = 'Password123!';
        const firstName = 'Test';
        const lastName = 'User';

        await signupPage.signup(firstName, lastName, email, password, password);
        await expect(await signupPage.isRedirectedToAccountPage()).toBeTruthy();

        console.log("Đăng ký tài khoản thành công: Passed");
    });

    // Ví dụ về test đăng ký thất bại (ví dụ: email đã tồn tại)
    test('Nên hiển thị thông báo lỗi khi đăng ký với email đã tồn tại', async ({ page }) => {
        const timestamp = Date.now();
        const existingEmail = `main182001@gmail.com`; // Giả sử email này đã tồn tại
        const password = 'Password123!';
        const firstName = 'Test';
        const lastName = 'User';

        await signupPage.signup(firstName, lastName, existingEmail, password, password);

        await expect(signupPage.errorMessage).toBeVisible();
        await expect(signupPage.getErrorMessageText()).resolves.toContain('There is already an account with this email address.');
        
        console.log("Đăng ký tài khoản thất bại (email đã tồn tại): Passed");
    });
        // - Đăng ký với mật khẩu không khớp
    test('Nên hiển thị thông báo lỗi khi mật khẩu không khớp', async({page})=> {
        const timestamp = Date.now();
        const email = `testuser${timestamp}@example.com`;
        const password = 'Password123!';
        const firstName = 'Test';
        const lastName = 'User';
        const confirmPassword= 'Password123'; //Confirm sai password
        
        await signupPage.signup(firstName,lastName,email,password,confirmPassword);

        await expect(signupPage.confirmPasswordError).toBeVisible();
        await expect(signupPage.getConfirmPasswordErrorText()).resolves.toContain('Please enter the same value again.');

        expect(page.url()).not.toContain('**/customer/account/**');
    });
    // - Đăng ký với mật khẩu không đủ 8 kí tự
    test('Nên hiển thị thông báo yêu cầu mật khẩu bằng hoặc hơn 8 kí tự ', async({page})=> {
        const timestamp = Date.now();
        const email = `testuser${timestamp}@example.com`;
        const password = '123';
        const firstName = 'Test';
        const lastName = 'User';

        await signupPage.signup(firstName,lastName,email,password,password)
        
        await expect(signupPage.passwordError).toBeVisible();
        await expect(signupPage.getErrorPasswordText()).resolves.toContain('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
        
    });
    // - Đăng ký với mật khẩu không có đủ 3 classes
    test('Nên hiển thị thông báo yêu cầu mật khẩu có đủ 3 classes ', async({page})=> {
        const timestamp = Date.now();
        const email = `testuser${timestamp}@example.com`;
        const password = '123456789';
        const firstName = 'Test';
        const lastName = 'User';

        await signupPage.signup(firstName,lastName,email,password,password)
        
        await expect(signupPage.passwordError).toBeVisible();
        await expect(signupPage.getErrorPasswordText()).resolves.toContain('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
    });
    // Bạn có thể thêm các test case khác như:
    // - Đăng ký thiếu thông tin bắt buộc
});