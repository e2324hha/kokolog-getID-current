// LIFFの初期化
liff.init({ liffId: "2006463532-kZ6VNRyx" }) // 正しい記述
.then(() => {
    // ログインしていない場合はログイン
    if (!liff.isLoggedIn()) {
        liff.login();
    } else {
        // モードを設定するためにリッチメニューに応じたアクションを設定
        const mode = getModeFromRichMenu();  // リッチメニューから取得したモード（current_location または route）
        navigateToUserList(mode);  // モードを渡して遷移
    }
    })
    .then(profile => {
        if (!profile) return; // プロフィールが取得できなかった場合は処理しない
        const profileContainer = document.getElementById('profile');
        if (profileContainer) {
            profileContainer.innerHTML = `
        <p>名前: ${profile.displayName}</p>
        <img src="${profile.pictureUrl}" alt="プロフィール画像" width="100">
        <p>ユーザーID: ${profile.userId}</p>
        <p id="countdown">10</p>
    `;
        }

        console.log(profile);
        const userId = profile.userId;  // プロフィールからユーザーIDを取得
        const mode =  "current_location" ;
        
        // 異なるパラメータをURLに追加
        const url = `https://example.com/samePage?userId=${userId}&mode=${mode}`;
    
        // 新しいページを開く（同じページでも異なるパラメータを渡す）
        liff.openWindow({ url: url, external: false });  // LIFF内で遷移
    })
    .catch(err => {
        console.error('プロフィールの取得に失敗しました:', err);
        document.getElementById('profile').innerHTML = '<p>ユーザー情報を取得できませんでした。</p>';
    });
