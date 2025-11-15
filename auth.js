// Google callback kontrolü - EN SON HALİ
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    if (accessToken) {
        console.log('Google giriş başarılı!');
        
        // Kullanıcı bilgilerini al
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
            .then(response => response.json())
            .then(userInfo => {
                const userData = {
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                    isGoogle: true,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('banabeyderler_user', JSON.stringify(userData));
                
                // BURASI ÖNEMLİ: horoscope.html'ye yönlendir
                setTimeout(() => {
                    window.location.href = 'horoscope.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    }
});