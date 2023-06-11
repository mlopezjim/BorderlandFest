const StyleSocial  = `
body {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0D1016;
    
  }
  .menu-checkbox {
    display: none;
  }
  .menu {
    position: relative;
  }
  .menu-dots {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    box-shadow: 0 0 0 0.3rem #D17430;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: rotate(90deg);
    transition: 0.3s;
    cursor: pointer;
  }
  .menu-dots:hover {
   transform: scale(1.2) rotate(90deg);
   }
  .menu-dot {
    width: 0.45rem;
    height: 0.45rem;
    background-color: #D17430;
    border-radius: 50%;
  }
  .menu-dot + .menu-dot {
    margin-top: 0.3rem;
  }
  .menu-items {
    font-size: 20px;
  text-decoration: none;
   list-style-type: none;
   position: absolute;
   top: -2.4rem;
   left: -2.2rem;
   width: 12rem;
   height: 12rem;
   pointer-events: none;
   display: grid; 
    grid-template-columns:
           0.8fr 0.8fr 0.8fr 0.8fr; 
    grid-template-rows: 
           0.8fr 0.8fr 0.8fr 0.8fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". a b ."
      "h . . c"
      "g . . d"
      ". f e ."; 
      opacity: 0;
      transition: 0.3s;  
    }
  
  .item1 { grid-area: a; }
  .item2 { grid-area: b; }
  .item3 { grid-area: c; }
  .item4 { grid-area: d; }
  .item5 { grid-area: e; }
  .item6 { grid-area: f; }
  .item7 { grid-area: g; }
  .item8 { grid-area: h; }
   
  .fa {
  color: #878787;
  transition: 1000ms;
  }
  .fa:hover {
    transform: scale(1.9);
  }
  #item1:hover {
    color: #2c55ad;
  }
  #item2:hover {
    color: #CD201F;
  }
  #item3:hover {
    color: #1DA1F2;
  }
  #item4:hover {
    color: #FF5733;
  }
  #item5:hover {
    color: #616E81;
  }
  #item6:hover {
    color: #eb1d16;
  }
  #item7:hover {
    color: #60dbfa;
  }
  #item8:hover {
    color: #6e11e7;
  }
  .menu-checkbox:checked + .menu > .menu-dots {
    transform: none;
      box-shadow: 0 0 0 4rem #e6e4e4;
  }
  .menu-checkbox:checked + .menu > .menu-items {
    opacity: 1;
    pointer-events: auto;
  }
  .menu-closer-overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
  }
  .menu-checkbox:checked + .menu > 
  .menu-closer-overlay {
    pointer-events: auto;
    cursor: pointer;
  }
  
  
`;
 
export default StyleSocial;