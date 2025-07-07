// pages/SignupPage.js

class SignupPage {
    constructor(page){
        this.page = page;
        this.firstName= page.locator('#firstname');
        this.lastName= page.locator('#lastname');
        this.emailInput=page.locator('#email_address');
        this.passwordInput= page.locator('#password');
        this.confirmPassword= page.locator('#password-confirmation');
        this.errorMessage= page.locator('[data-ui-id="message-error"]');
        this.signupbutton= page.getByRole('button',{name:'Create an Account'});

        this.accountPageTitle = page.getByRole('heading', { name: 'My Account' }); // Tiêu đề trang "My Account"
        this.successMessage = page.locator('.message-success'); // Thông báo thành công chung
        this.confirmPasswordError = page.locator('#password-confirmation-error');
        this.passwordError =  page.locator('#password-error')
    }

    async navigatetoSignup(){
        await this.page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
    }

    async signup(firstname,lastname,email,password,confirmpassword){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPassword.fill(confirmpassword);
        await this.signupbutton.click();
    }

    async isRedirectedToAccountPage() {

        await this.page.waitForURL('**/customer/account/**');

        const isTitleVisible = await this.accountPageTitle.isVisible();
        const isSuccessMessageVisible = await this.successMessage.isVisible();
        const successMessageText = await this.successMessage.textContent();
        const isSpecificSuccessMessage = successMessageText.includes('Thank you for registering');
        return isTitleVisible && (isSuccessMessageVisible && isSpecificSuccessMessage); 
    }

    async getErrorMessageText() {
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.textContent();
    }
    async getConfirmPasswordErrorText(){
        await this.confirmPasswordError.waitFor({ state: 'visible'});
        return await this.confirmPasswordError.textContent();
    }
    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }
    async getErrorPasswordText() {
        await this.passwordError.waitFor({state:'visible'});
        return await this.passwordError.textContent();
    }
}

module.exports = SignupPage;