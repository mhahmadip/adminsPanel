/**
 * Created by mojtaba on 3/14/16.
 */
/*global angular*/
angular
    .module('app')
    .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'SIGNIN_MSG': 'Sign in with your pushe Account',
        'EMAIL': 'Email',
        'PASSWORD': 'Password',
        'REPASSWORD': 'rePassword',
        'REMEMBER_ME':'Keep me signed in',
        'AS_DEMO':'as demo',
        'SIGNIN':'sign in',
        'FORGOT':'Forgot password?',
        'SIGNUP':'sign up',
        'HAVENT_ACCOUNT':'Do not have an account? ',
        'HAVE_ACCOUNT':'Already have an account? ',
        'FORGOT_PASSWORD':'Forgot your password?',
        'FORGOT_MSG':'Enter your email address below and we will send you instructions on how to change your password.',
        'SIGNUP_MSG':'Sign up to your pushe Account',
        'AGREE':'Agree the ',
        'TERMS':'terms and policy',
        'PROFILE':'Profile',
        'SIGNOUT':'Sign out',
        'HOME':'home',
        'APPLICATIONS':'applications',
        'INSTALLED':'installed',
        'NOTIFICATIONS':'notifications',
        'SECTIONNAME':'admins panel',
        'DEVICE':'device',
        'APPLICATION':'application',
        'INSTALLTIME':'install time',
        'LASTSEEN':'last seen',
        'INSTALL_TIME_PLACE_HOLDER':'1/2/12',
        'LASTSEEN_PLACE_HOLDER':'3/5/13',
        'ADD_NEW_APP':'Add new Application',
        'NAME':'name',
        'PACKNAME':'package name',
        'GLOBAL_SEARCH_PLACEHOLDER':'asdvdverfvservesrvserv',
        'CANCEL':'cancel',
        'OK':'OK',
        'HELP':'help',
        'SUPPORT':'support'
    });

    $translateProvider.translations('fa', {
        'SIGNIN_MSG': 'ورود به بخش مدیریت',
        'EMAIL': 'ایمیل',
        'PASSWORD': 'رمز عبور',
        'REPASSWORD': 'رمز عبور مجدد',
        'REMEMBER_ME':'مرا بخاطر بسپار؟',
        'AS_DEMO':'نمایش دمو',
        'SIGNIN':'ورود',
        'FORGOT':'رمز عبور را فراموش کرده اید؟?',
        'SIGNUP':'ثبت نام',
        'HAVENT_ACCOUNT':'ثبت نام نکرده اید؟ ',
        'HAVE_ACCOUNT':'قبلا ثبت نام کرده اید؟ ',
        'FORGOT_PASSWORD':'رمز عبورتان را فراموش کرده اید؟',
        'FORGOT_MSG':'ایمیل خود را وارد نمایید تا نحوه احیا نمودن رمز عبور را برای شما ارسال کنیم.',
        'SIGNUP_MSG':'ثبت نام',
        'AGREE':'Agree the ',
        'TERMS':'terms and policy',
        'PROFILE':'پروفایل',
        'SIGNOUT':'خروج',
        'HOME':'خانه',
        'APPLICATIONS':'اپلیکیشن ها',
        'INSTALLED':'نصب ها',
        'NOTIFICATIONS':'اعلان ها',
        'SECTIONNAME':'مدیریت نوتیفیکیشن',
        'DEVICE':'دستگاه',
        'APPLICATION':'اپلیکیشن',
        'INSTALLTIME':'تاریخ نصب',
        'LASTSEEN':'آخرین بازدید',
        'INSTALL_TIME_PLACE_HOLDER':'۱۳۹۴.۱۱.۲۳',
        'LASTSEEN_PLACE_HOLDER':'۱۳۹۴.۱۲.۳',
        'ADD_NEW_APP':'افزودن اپلیکیشن',
        'NAME':'نام',
        'PACKNAME':'نام بسته اپلیکیشن',
        'GLOBAL_SEARCH_PLACEHOLDER':'جستجو.',
        'CANCEL':'cancel',
        'OK':'تایید',
        'HELP':'کمک',
        'SUPPORT':'پشتیبانی'
    });

    $translateProvider.preferredLanguage('fa');
}]);