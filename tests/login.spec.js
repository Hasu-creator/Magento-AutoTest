const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage'); // Nhập lớp LoginPage mà bạn vừa tạo

test.describe('Kiểm thử Đăng nhập Khách hàng trên Magento', () => {
    let loginPage; // Khai báo một biến để giữ đối tượng LoginPage

    // `test.beforeEach` sẽ chạy trước MỖI test case trong khối describe này
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); // Khởi tạo một đối tượng LoginPage mới cho mỗi test
        await loginPage.navigateToLogin(); // Điều hướng đến trang đăng nhập thông qua Page Object
    });

    // Test kịch bản: Đăng nhập thành công
    test('Nên cho phép khách hàng đăng nhập thành công', async ({ page }) => {
        // Sử dụng phương thức login từ Page Object để thực hiện các hành động
        await loginPage.login('main182001@gmail.com', 'Password123!');

        // Sử dụng các assertions trên các locator đã định nghĩa trong Page Object
        await expect(loginPage.welcomeMessage).toBeVisible();
        await expect(loginPage.welcomeMessage).toContainText('Welcome,');
        
        // Vẫn kiểm tra URL trực tiếp trên đối tượng 'page' của Playwright
        await expect(page.url()).toContain('customer/account'); 
        
        console.log("Đăng nhập thành công: Passed");
    });

    // Test kịch bản: Đăng nhập thất bại với thông tin không hợp lệ
    test('Nên hiển thị thông báo lỗi khi đăng nhập không hợp lệ', async ({ page }) => {
        await loginPage.login('main3540@gmail.com', 'Pass123'); // Đăng nhập với thông tin sai

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');

        console.log("Đăng nhập thất bại: Passed");
    });
    
});