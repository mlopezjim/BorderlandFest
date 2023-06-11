import React from 'react';
import StyleSocial from './StyleSocial';
import YoutubeOutlined from '@ant-design/icons'

const Social = () => {
    return (

        <body>
            <YoutubeOutlined />
            <style> {StyleSocial}</style>
            <input class="menu-checkbox" id="menu" type="checkbox" />
            <nav class="menu">
                <label class="menu-dots" for="menu">
                    <span class="menu-dot"></span>
                    <span class="menu-dot"></span>
                    <span class="menu-dot"></span>
                </label>


                <div class="menu-items">
                    <div class="item1">
                        <YoutubeOutlined />
                    </div>
                    <div class="item2">
                        <a href="#"><i class="fa fa-youtube" id="item2">
                        </i></a>
                    </div>
                    
                    <div class="item3">
                        <a href="#"><i class="fa fa-twitter" id="item3"></i></a>
                    </div>
                    <div class="item4">
                        <a href="#"><i class="fa fa-instagram" id="item4"></i></a>
                    </div>
                    <div class="item5">
                        <a href="#"><i class="fa fa-codepen" id="item5"></i></a>
                    </div>
                    <div class="item6">
                        <a href="#"><i class="fa fa-google" id="item6"></i></a>
                    </div>
                    <div class="item7">
                        <a href="#"><i class="fa fa-linkedin" id="item7"></i></a>
                    </div>
                    <div class="item8">
                        <a href="#"><i class="fa fa-github" id="item8"></i></a>
                    </div>
                </div>
                <label for="menu" class="menu-closer-overlay"></label>
            </nav>
        </body>






















    );
}

export default Social;