function googleLogin() {
    console.log('Google giriş butonuna tıklandı!');
    
    const clientId = '264644476458-iou4uj8klkll3dpcch1mokr1tf9dv72j.apps.googleusercontent.com';
    const redirectUri = 'https://cosmicchat.live';
    
    // Google OAuth URL'si - TAM GÜNCEL
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=token` +
        `&scope=profile%20email` +
        `&include_granted_scopes=true` +
        `&state=pass_through_value`;
    
    console.log('Google OAuth URL:', authUrl);
    window.location.href = authUrl;
}

// Google callback kontrolü
window.addEventListener('load', function() {
    console.log('Sayfa yüklendi, token kontrol ediliyor...');
    
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    console.log('URL hash:', hash);
    console.log('Access Token:', accessToken);
    
    if (accessToken) {
        console.log('Google giriş başarılı! Token alındı.');
        
        // Kullanıcı bilgilerini al
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Google API hatası');
                }
                return response.json();
            })
            .then(userInfo => {
                console.log('Kullanıcı bilgileri:', userInfo);
                
                const userData = {
                    name: userInfo.name || 'Kullanıcı',
                    email: userInfo.email,
                    picture: userInfo.picture,
                    isGoogle: true,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('cosmicchat_user', JSON.stringify(userData));
                console.log('Kullanıcı kaydedildi, yönlendiriliyor...');
                
                // horoscope.html'ye yönlendir
                setTimeout(() => {
                    window.location.href = 'horoscope.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Hata:', error);
                alert('Google girişinde hata oluştu. Lütfen tekrar deneyin.');
            });
    }
    
    // Zaten giriş yapmışsa
    const existingUser = localStorage.getItem('cosmicchat_user');
    if (existingUser) {
        console.log('Zaten giriş yapılmış, yönlendiriliyor...');
        window.location.href = 'horoscope.html';
    }
});