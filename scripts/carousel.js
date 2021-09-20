const carouselData = [
  {
    title: 'Caller ID',
    text: 'Identify unknown numbers, spam or companies calling before picking up! See the true identity of each incoming call anywhere in the world - landline, mobile or pre-paid!',
    icon: '/assets/images/icons/1.svg',
  },
  {
    title: 'Spam Blocking',
    text: 'Block numbers and auto-block telemarketers and robocalls. Our community reports numbers in real time so everyone is always protected against unwanted calls.',
    icon: '/assets/images/icons/2.svg',
  },
  {
    title: 'Intelligent dialer',
    text: 'Always call the right people! Dial your friends, family and identify the names of unknown numbers as you dial!',
    icon: '/assets/images/icons/3.svg',
  },
  {
    title: 'Chat, SMS and Calls',
    text: 'No need to switch to other apps. Truecaller helps you manage all your communication.',
    icon: '/assets/images/icons/4.svg',
  },
]

let interval;
let iconIndex = 0;

function setData(index = 0) {
  carouselData.forEach((el, ind) => {
    let { title, text, icon } = el
    $('.text-wrapper').append(`
      <div class="item ${ind == 0 ? 'active fade-in-up' : ''}" data-index="${ind}">
        <div class="icon-image">
          <img src="${icon}" alt="${title}">
        </div>
        <div class="text-col">
            <h1>${title}</h1>
            <p>${text}</p>
        </div>
      </div>
    `)
  })
  $(".carousel-image").find(`img[index='${index}']`).fadeIn().siblings().hide()
}
setData()


function setActive() {
  $(`.icon`).removeClass('active loading')
  let length = carouselData.length
  iconIndex++
  let ind = Math.abs(iconIndex % length)

  if(ind == length-1) {
    $(`.icon:eq(0)`).addClass('loading')
    $(`.icon:eq(${length-1})`).addClass('active')
    $(`.item[data-index="${length-1}"]`).addClass('active fade-in-up').siblings().removeClass('active')
    return
  }
  
  $(".carousel-image").find(`img[index='${ind}']`).fadeIn().siblings().hide()
  $(`.icon:eq(${ind})`).addClass('active').next().addClass('loading')
  $(`.item[data-index="${ind}"]`).addClass('active fade-in-up').siblings().removeClass('active')
}


void function InitDomEvents() {
  $('.slider-buttons .icon').click(function () {
    iconIndex = $(this).attr('index')

    $(`.icon`).removeClass('active loading')
    $(`.icon:eq(${iconIndex})`).addClass('active').next().addClass('loading')
    $(`.item[data-index="${iconIndex}"]`).addClass('active fade-in-up').siblings().removeClass('active')
    $(".carousel-image").find(`img[index='${iconIndex}']`).fadeIn().siblings().hide()

    if (iconIndex == carouselData.length - 1) {
      iconIndex = 0
      $(`.icon:eq(${iconIndex})`).addClass('loading')
      $(`.icon:eq(${carouselData.length - 1})`).addClass('active')
    }


    $("animate")[0].beginElement();
    clearInterval(interval)
    interval = setInterval(setActive, 7000);
  })

  $('.btn').click(function () {
    $('body').toggleClass('night')
    if($('body').hasClass('night')) {
      $('.light').show().siblings('.btn').hide()
    } else {
      $('.dark').show().siblings('.btn').hide()
    }
  })

  interval = setInterval(setActive, 7000);
}()
