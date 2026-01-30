function cargarPortafolio() {
    const url = `https://github.com/Sebas973/WebDesign-FinalProject-UTN/assets/json/InstagramPosts.json`;

    $.getJSON(url, function (data) {
        $.each(data, function (index, posts) {
            const cardHTML = `
        <div class="col">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body p-0">
              <blockquote class="instagram-media w-100"
                data-instgrm-permalink="https://www.instagram.com/p/${posts.imageId}/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
                style="margin:0 auto; border:0; padding:0;">
              </blockquote>
            </div>
          </div>
        </div>
      `;
            $('#InstagramPostsContainer').append(cardHTML);
        })
        window.instgrm.Embeds.process()
    });



}
