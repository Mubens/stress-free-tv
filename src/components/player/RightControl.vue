<template>
  <div class="right-control">
    <div class="btns volume-btn">
      <div class="btn" v-show="!isMuted" @click="volume">
        <svg
          t="1588823243294"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3696"
          width="80%"
          height="100%"
        >
          <path
            d="M816.938667 828.117333a32 32 0 0 1-30.592-56.234666c36.650667-19.968 69.248-65.066667 89.173333-125.738667 13.354667-40.533333 20.48-86.186667 20.48-133.717333 0-45.013333-6.4-88.448-18.432-127.402667-19.925333-64.512-54.016-112.426667-92.501333-132.693333a32 32 0 1 1 29.866666-56.618667c55.253333 29.141333 99.242667 90.965333 123.776 170.453333 13.952 45.141333 21.290667 94.890667 21.290667 146.261334 0 54.229333-8.192 106.666667-23.637333 153.728-24.661333 74.965333-66.858667 133.333333-119.466667 161.962666z m-125.952-162.346666a32 32 0 1 1-37.973334-51.541334c37.333333-27.477333 50.986667-48.64 50.986667-102.229333 0-51.029333-9.514667-68.224-43.264-97.792l-1.621333-1.408-5.546667-4.906667a32 32 0 0 1 42.581333-47.786666l5.12 4.565333 1.664 1.408C749.44 406.826667 768 440.32 768 512c0 76.885333-24.832 115.285333-77.013333 153.770667zM261.418667 341.333333l222.506666-194.261333A42.666667 42.666667 0 0 1 554.666667 179.2v665.6a42.666667 42.666667 0 0 1-70.741334 32.128L261.418667 682.666667H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-170.666666a85.333333 85.333333 0 0 1 85.333334-85.333334h90.752z"
            fill="#ffffff"
            p-id="3697"
          />
        </svg>
      </div>
      <div class="btn" v-show="isMuted" @click="volume">
        <svg
          t="1588823297932"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3879"
          width="80%"
          height="100%"
        >
          <path
            d="M810.666667 754.432l49.408 41.386667c-13.397333 13.098667-27.818667 23.936-43.136 32.298666a32 32 0 0 1-30.592-56.234666c8.362667-4.522667 16.512-10.410667 24.32-17.493334z m77.568-157.738667c5.12-26.88 7.765333-55.210667 7.765333-84.266666 0-45.013333-6.4-88.448-18.432-127.402667-19.925333-64.512-54.016-112.426667-92.501333-132.693333a32 32 0 1 1 29.866666-56.618667c55.253333 29.141333 99.242667 90.965333 123.776 170.453333 13.952 45.141333 21.290667 94.890667 21.290667 146.261334a504.746667 504.746667 0 0 1-16.725333 130.474666l-55.04-46.208z m-239.786667 21.632l49.92 41.813334a355.413333 355.413333 0 0 1-7.381333 5.632 32 32 0 0 1-42.496-47.445334z m-4.693333-226.773333a32 32 0 0 1 52.394666-31.445333l5.12 4.565333 1.664 1.408c42.752 37.504 61.909333 68.864 64.725334 129.450667l-123.904-103.978667zM289.365333 317.013333L554.666667 539.605333V844.8a42.666667 42.666667 0 0 1-70.741334 32.128L261.418667 682.666667H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-170.666666a85.333333 85.333333 0 0 1 85.333334-85.333334h90.752l27.946666-24.362666z m130.133334-113.621333l64.426666-56.277333A42.666667 42.666667 0 0 1 554.666667 179.2v137.6L419.456 203.349333z m-168.405334-33.024A32 32 0 0 1 296.192 166.4l670.037333 562.218667a32 32 0 0 1-41.130666 49.024L255.061333 215.424a32 32 0 0 1-3.968-45.098667z"
            fill="#ffffff"
            p-id="3880"
          />
        </svg>
      </div>
      <div class="volume" id="volume">
        <div class="volumeNum" ref="volumeNum">{{ volumeNum }}</div>
        <div class="zhezao">
          <div class="max-volume-bar">
            <div class="wrap" ref="wrap">
              <div class="volume-ball" :style="{ top: top + '%' }" ref="volumeBall"></div>
            </div>
            <div class="real-volume-bar" :style="{ height: height + '%' }" ref="volumeReal"></div>
          </div>
        </div>
        <div class="volumeBar" ref="volumeBar"></div>
      </div>
    </div>
    <div class="no-full" v-show="size.screenFlag !== 3">
      <!-- 宽屏按钮 -->
      <div class="btns">
        <div class="btn" v-if="size.screenFlag === 1" @click="wideScreen">
          <svg
            width="94%"
            height="100%"
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="margin-top: 5px; margin-left: 3px"
          >
            <rect width="795" height="620" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0" transform="scale(0.00125786 0.0016129)" />
              </pattern>
              <image
                id="image0"
                width="795"
                height="620"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxsAAAJsCAYAAACVjr4EAAAX8klEQVR4nO3d2XYjxxFFUbaW/v+X6WVJkNAghhryRuWw97vdMtsVkacSoH59f39/sZkfFnDGLz89AFbyp7/tjwQG0Ip5AjAfL5LeEBs/OQwAALDV49lRfNwRG38TGAAAtHB/rlw+PFaPDZEBAEDK7ay5bHSsGBsCAwCASsvedqwUGyIDAICrLXXbsUJsiAwAAHqzRHTMHBsiAwCA3k0dHTPGhsgAAGA0U0bHTLEhMgAAGN1U0fFHB/8MLQgNAABmMsX5dvSbDZEBAMCshr/lGDU2RAYAAKsYNjpG/BiV0AAAYEXDnYNHutkQGQAArG6oW45RbjaEBgAA/GeI8/EIsSE0AADgp+7PyT1/jEpkAADAe11/rKrXmw2hAQAA23V5fu4xNoQGAADs1905urfYEBoAAHBcV+fpXr6zITIAAKCNbr7H0cPNhtAAAID2Lj9nXx0bQgMAAHIuPW9fGRtCAwAA8i47d18VG0IDAADqXHL+viI2hAYAANQrP4dXx4bQAACA65SexytjQ2gAAMD1ys7lVbEhNAAAoB8l5/OK2BAaAADQn/g5vYd/qR8AADChdGy41QAAgH5Fz+vJ2BAaAADQv9i5PRUbQgMAAMYROb8nYkNoAADAeJqf431BHAAAiGgdG241AABgXE3P8y1jQ2gAAMD4mp3rW8WG0AAAgHk0Od/7zgYAABDRIjbcagAAwHxOn/PPxobQAACAeZ067/sYFQAAEHEmNtxqAADA/A6f+91sAAAAEUdjw60GAACs49D5/0hsCA0AAFjP7g7wMSoAACBib2y41QAAgHXt6gE3GwAAQMSe2HCrAQAAbO4CNxsAAEDE1thwqwEAANxs6gM3GwAAQMSW2HCrAQAAPPrYCW42AACAiE+x4VYDAAB45W0vuNkAAAAixAYAABDxLjZ8hAoAAPjkZTe42QAAACJexYZbDQAAYKun/eBmAwAAiBAbAABAxLPY8BEqAABgrx8d4WYDAACIEBsAAECE2AAAACIeY8P3NQAAgKN+6wk3GwAAQITYAAAAIu5jw0eoAACAs/7tCjcbAABAhNgAAAAixAYAABAhNgAAgIhbbPhyOAAA0MpffeFmAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgIg//CYqAAAg4NvNBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAICIP/1YKfRr5x/17S8HAGBcYoOkvXHx6PE/Lz4AGJUXbixJbNDa2cB45/bfbQADMIIzO9ELN6YgNmglGRmP7v8swxeAnqT2od3HkHxBnBYqQ+PRlX82ANz8KtxJlX8WnOJmgzN6GXQ+XgXAVXp44Wb/0S03GxzV4xsVb3kAqNLT7YL9R7fcbLBX7wPNWx4A0np+4Wb/0RU3G+wx0psTb3kASBjlpRt0QWyw1YjDy8AFoKVR9or9RzfEBluMPLQMXADOGvG3P9l/dEFs8MkMw8rABeAoL9zgBLHBOzMNKQMXgL28cIOTxAYrMXAB2MoLN2hAbPDKrIPJwAXgkxl3hf3HJcQGz8w+kAxcAF6xI6AhscGqLBMAHnnZBo2JDR6tNIgMXQBuVtkJdh+lxAarM3QBsAsgRGxwb9Vha8kArGvFHWDvUUZswN8MXoD1mP0QJja4MXD9DABWsvrMX/1/P0XEBvzO8AWYn1kPRcQG/GQJAczLjIdCYoMvg/cpPxOA+Zjtv/PzIE5swGuGMMA8zHS4gNiA9ywngPGZ5XARsQGfWVIA4zLD4UJiA7axrADGY3bDxcQGbGdpAYzDzN7Gz4kosYEhs4+fF0D/zGrohNiA/SwxgH6Z0dARsQHHWGYA/TGboTNiA46z1AD6YSZDh8QGnGO5AVzPLIZOiQ2+l/8JnGfJAVzHDIaOiQ1ow7IDqGf2QufEBrRj6QHUMXNhAGID2rL8APLM2nZ8nJoosQHtWYIAOWYsDERs8OWtRoRlCNCe2QqDERuQYykCtGOmwoDEBmRZjgDnmaUwKLEBeZYkwHFmaI6PURMnNrgxcLIsS4D9zE4YnNiAOpYmwHZmZpaXjJQQG9wzePIsT4DPzEqYhNiAepYowGtmJExEbPDI7UYNyxTgJ7Oxhl1PGbEB17FUAf5jJsKExAbPeONRx3IFMAsr2fGUEhu8YhjVsWSBlZmBdex2yokN3jGU6li2wIrMPpic2IB+WLrASsy8Wl4gcgmxwSeGUy3LF1iBWVfLLucyYoMtDKlaljAwMzOulh3OpcQGWxlWtSxjYEZmWy27m8uJDfYwtGpZysBMzLRadjZdEBvsZXjVspyBGZhltexquiE2OMIQq2VJAyMzw2rZ0XRFbHCUYVbLsgZGZHbVspvpjtjgDEOtlqUNjMTMqmUn0yWxwVmGWy3LGxiBWVXLLqZbYoMWDLlaljjQMzOqlh1M18QGrRh2tSxzoEdmUy27l+6JDVoy9GpZ6kBPzKRadi5DEBu0ZvjVstyBHphFtexahiE2SDAEa1nywJXMoFp2LEMRG6QYhrUse+AKZk8tu5XhiA2SDMValj5QycypZacyJLFBmuFYy/IHKpg1texShiU2qGBI1nIIAJLMmFp2KEMTG1QxLGs5DAAJZkstu5PhiQ0qGZq1HAqAlsyUWnYmUxAbVDM8azkcAC2YJbXsSqYhNriCIVrLIQE4wwypZUcyFbHBVQzTWg4LwBFmRy27kemIDa5kqNZyaAD2MDNq2YlMSWxwNcO1lsMDsIVZUcsuZFpigx4YsrUcIoB3zIhadiBTExv0wrCt5TABPGM21LL7mJ7YoCeGbi2HCuCemVDLzmMJYoPeGL61HC6AL7OgnF3HMsQGPTKEazlkwNrMgFp2HEsRG/TKMK7lsAFr8uzXsttYjtigZ4ZyLYcOWItnvpadxpLEBr0znGs5fMAaPOu17DKWJTYYgSFdyyEE5uYZr2WHsTSxwSgM61oOIzAnz3Ytu4vliQ1GYmjXciiBuXima9lZLO9LbDAgw7uWwwnMwbNcy66Cf4gNRmSI13JIgbF5hmvZUXBHbDAqw7yWwwqMybNby26CB2KDkRnqtRxaYCye2Vp2EjwhNhid4V7L4QXG4FmtZRfBC2KDGRjytRxioG+e0Vp2ELwhNpiFYV/LYQb65NmsZffAB2KDmRj6tRxqgJXZObCB2GA2hj+wKi8A6tg1sJHYYEaWQB2HG+iDZ7GOHQM7iA1mZRnUcciBa3kG69gtsJPYYGaWAgCt2ClwgNhgdpZDDW9W4RqevRp2CRwkNliBJQHAUXYInCA2AGBMbjWA7okNoBUHH2A2bjXgJLHBKiwMAIBiYgMAAIgQGwAwHh9bzHMjDg2IDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2WIVfEwnMxK9lzbM3oAGxAbTi8AMA/EZsAAAAEWKDFbgKB+AI+wNOEhvMzqKo4SNUUM9zB3RPbDAzoQHAWXYJnCA2mJXlUMfbVbiO56+GnQIHiQ1mZCnUcdABVmG3wAFig9lYBsBqRH8dOwZ2EhvMxBKo5YAD/fA81rFrYAexwSwM/1oONtAfz2UdOwc2EhvMwNCv5UADYPfAJmKD0Rn2tYQG9M0zWssOgg/EBiMz5Gs5xMAYPKu17CJ4Q2wwKsO9lsMLjMUzW8tOghfEBiMy1Gs5tMCYPLu17CZ4QmwwGsO8lsMKjM0zXMuOggdig5EY4rUcUmAOnuVadhXcERuMwvCu5XACc/FM17Kz4B9igxEY2rUcSmBOnu1adhfL+xIbDMCwruUwAnPzjNeyw1ie2KBnhnQthxBYg2e9ll3G0sQGvTKcazl8wFo887XsNJYlNuiRoVzLoQPW5NmvZbexJLFBbwzjWg4bsDYzoJYdx3LEBj0xhGs5ZABfZkE5u46liA16YfjWcrgA7pkJtew8liE26IGhW8uhAnjGbKhl97EEscHVDNtaDhPAO2ZELTuQ6YkNrmTI1nKIALYwK2rZhUxNbHAVw7WWwwOwh5lRy05kWmKDKxiqtRwagCPMjlp2I1MSG1QzTGs5LABnmCG17EimIzaoZIjWckgAWjBLatmVTEVsUMXwrOVwALRkptSyM5mG2KCCoVnLoQBIMFtq2Z1MQWyQZljWchgAksyYWnYowxMbJBmStRwCgApmTS27lKGJDVIMx1qWP1DJzKllpzIssUGCoVjL0geuYPbUslsZktigNcOwlmUPXMkMqmXHMhyxQUuGYC1LHuiBWVTLrmUoYoNWDL9aljvQEzOplp3LMMQGLRh6tSx1oEdmUy27lyGIDc4y7GpZ5kDPzKhadjDdExucYcjVssSBEZhVtexiuiY2OMpwq2V5AyMxs2rZyXRLbHCEoVbL0gZGZHbVspvpkthgL8OslmUNjMwMq2VH0x2xwR6GWC1LGpiBWVbLrqYrYoOtDK9aljMwEzOtlp1NN8QGWxhatSxlYEZmWy27my6IDT4xrGpZxsDMzLhadjiXExvQD0sYWIFZV0twcCmxwTsGVB3LF1iJmVfLPucyYoNXDKY6li6wIrOvlr3OJcQGzxhIdSxbYGVmIExObMB1LFkAs7CSl4mUExs8MohqWK4A/zET69jzlBIbUM9SBfjJbIQJiQ3ueduRZ5kCvGZG1rDvKSM2oI4lCvCZWQkTERvceMuRZXkCbGdmwiTEBuRZmgD7mZ1ZXjJSQmxAlmUJcJwZCoMTG5BjSQKcZ5bmuN0gTmzwZdhEWI4A7ZipMCixAe1ZigDtma0wILEBbVmGADlmLAxGbEA7liBAnlkLAxEb0IblB1DHzG3H9zaJEhsYMudZegD1zF4YgNiAcyw7gOuYwdA5sQHHWXIA1zOLoWNiA46x3AD6YSZDp8QG7GepAfTHbIYOiQ0M5338vAD6ZUZDZ8QGbGeJAfTPrIaOiA3YxvICGIeZDZ0QG/CZpQUwHrN7Gz8nosQGvGcIA4zLDIeLiQ14zZICGJ9ZDhcSG3wZxE/5mQDMw0yHi4gN+MlSApiP2Q4XEBvwO8sIYF5m/O/8PIgTG9wYOH4GACsw66GQ2IC/WT4A6zDzoYjY4N6qw9fSAVjP6rN/9f/9FBEbrM6wBViXHQBhYoNHKw1eSwaAFXeB/UcZscGqDFoAbuwECBEbPDP70LVUAHi0ym6wAyklNnhl1mFkyALwipdt0JjYYCWGLACf2BXQkNjgnZkGruUBwFYz7gx7kEuIDT6ZYTgZsADs5YUbNCA22GLkIWXAAnCUF25wkthgqxGHlQELwFleuMEJYoM9RhpaBiwArXwPuFfsQbogNtir94E74kIAYAyj7Bd7kG6IDY7qcZAZrgCk9b5r7EK68qe/Dk64DbRfF/8QDVYAKn13sPse2YV0yc0GLVw54AxXAK7Q08d27UK65WaDVipvOQxVAHpx5S2/fUj3xAat3Q++1oPXUAWgV166wRNig6THYbh3ABumAIwm9dLNTmRIYoNKBiUAKzkTHnYmUxAbAAB54oEl+W1UAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAECE2AACACLEBAABEiA0AACBCbAAAABFiAwAAiBAbAABAhNgAAAAixAYAABAhNgAAgAixAQAARIgNAAAgQmwAAAARYgMAAIgQGwAAQITYAAAAIsQGAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEWIDAACIEBsAAECE2AAAACLEBgAAEPH/2PjlRwsAADT2y80GAAAQITYAAIAIsQEAAESIDQAAIEJsAAAAEbfY8BupAACAVv7qCzcbAABAhNgAAAAixAYAABAhNgAAgIj72PAlcQAA4Kx/u8LNBgAAECE2AACAiMfY8FEqAADgqN96ws0GAAAQITYAAIAIsQEAAEQ8iw3f2wAAAPb60RFuNgAAgAixAQAARLyKDR+lAgAAtnraD242AACAiHex4XYDAAD45GU3uNkAAAAixAYAABDxKTZ8lAoAAHjlbS+42QAAACK2xIbbDQAA4NHHTnCzAQAARGyNDbcbAADAzaY+cLMBAABE7IkNtxsAAMDmLnCzAQAAROyNDbcbAACwrl094GYDAACIOBIbbjcAAGA9uzvg6M2G4AAAgHUcOv/7GBUAABBxJjbcbgAAwPwOn/vdbAAAABFnY8PtBgAAzOvUeb/FzYbgAACA+Zw+5/sYFQAAENEqNtxuAADAPJqc71vebAgOAAAYX7NzfeuPUQkOAAAYV9PzvO9sAAAAEYnYcLsBAADjaX6OT91sCA4AABhH5Pye/BiV4AAAgP7Fzu3p72wIDgAA6Ff0vO4L4gAAQERFbLjdAACA/sTP6VU3G4IDAAD6UXI+r/wYleAAAIDrlZ3Lq7+zITgAAOA6pefxK74gLjgAAKBe+Tn8qt9GJTgAAKDOJefvK3/1reAAAIC8y87dV/97NgQHAADkXHre7uFf6ic4AACgvcvP2X9e/Q/wj9sP4vvyfxIAABhbNy/ze7jZuOeWAwAAjuvqPN1bbHwJDgAAOKS7c3SPsfElOAAAYJcuz8+9fGfjGd/jAACA97p+Sd/rzcY9txwAAPBT9+fkEWLjS3AAAMBvhjgf9/wxqkc+VgUAwOqGegk/ys3GPbccAACsaLhz8Eg3G/fccgAAsIphX7aPGhs3ogMAgFkN/4meET9G9YyPVgEAMJMpzrej32zcc8sBAMDopnqJPlNs3IgOAABGM+UndWaMjRvRAQBA76b+OsDMsXEjOgAA6M0S3zleITZuRAcAAFdb6hcbrRQbN/d/wcIDAIC0ZX9z6oqxcc9tBwAAKcv/6xlWj40btx0AALSwfGDcExs/+T8IwBy8PAIqODu+8vX19T9pmfwzvNLowAAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
        </div>
        <div class="btn" v-else @click="wideScreen">
          <svg
            t="1588395433148"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13101"
            width="94%"
            height="100%"
          >
            <path
              d="M824.448 199.552H199.552c-49.30133333 0-89.26933333 39.968-89.26933333 89.26933333v446.35733334c0 49.30133333 39.968 89.26933333 89.26933333 89.26933333h624.896c49.30133333 0 89.26933333-39.968 89.26933333-89.26933333V288.82133333c0-49.30133333-39.95733333-89.26933333-89.26933333-89.26933333zM338.98666667 521.32266667l45.90933333 45.90933333c13.07733333 13.06666667 13.07733333 34.272 0 47.33866667-13.07733333 13.07733333-34.272 13.07733333-47.33866667 0l-55.232-55.232-31.616-31.616c-8.68266667-8.68266667-8.68266667-22.76266667 0-31.44533334l31.616-31.616 55.232-55.232c13.07733333-13.06666667 34.272-13.06666667 47.33866667 0 13.07733333 13.07733333 13.07733333 34.272 0 47.33866667l-45.90933333 45.90933333c-5.152 5.152-5.152 13.49333333 0 18.64533334z m417.45066666 6.4l-31.62666666 31.616-55.232 55.232c-13.07733333 13.07733333-34.272 13.07733333-47.33866667 0-13.06666667-13.06666667-13.06666667-34.272 0-47.33866667l45.90933333-45.90933333c5.14133333-5.152 5.14133333-13.49333333 0-18.64533334l-45.90933333-45.90933333c-13.06666667-13.07733333-13.06666667-34.272 0-47.33866667 13.07733333-13.06666667 34.272-13.06666667 47.33866667 0l55.232 55.232 31.62666666 31.616c8.68266667 8.68266667 8.68266667 22.76266667 0 31.44533334z"
              p-id="13102"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
      <!-- 网页全屏按钮 -->
      <div class="btns">
        <div class="btn" v-if="size.screenFlag === 2" @click="pageFullScreen">
          <svg
            t="1588409007774"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3090"
            width="100%"
            height="100%"
          >
            <path
              d="M803.39 220.61H220.61c-45.98 0-83.25 37.27-83.25 83.25v416.27c0 45.98 37.27 83.25 83.25 83.25h582.78c45.98 0 83.25-37.27 83.25-83.25V303.86c0-45.98-37.27-83.25-83.25-83.25zM293.46 407.93h60.55c6.79 0 12.29-5.5 12.29-12.29v-60.55c0-17.24 13.98-31.22 31.22-31.22s31.22 13.98 31.22 31.22v114.55c0 11.45-9.28 20.74-20.74 20.74H293.45c-17.24 0-31.22-13.98-31.22-31.22 0.01-17.25 13.99-31.23 31.23-31.23z m135.29 208.14v72.85c0 17.24-13.98 31.22-31.22 31.22s-31.22-13.98-31.22-31.22v-60.55c0-6.79-5.51-12.29-12.29-12.29h-60.56c-17.24 0-31.22-13.98-31.22-31.22s13.98-31.22 31.22-31.22h114.55c11.45 0 20.73 9.28 20.74 20.74v41.69z m301.79 0h-60.55c-6.79 0-12.29 5.5-12.29 12.29v60.55c0 17.24-13.98 31.22-31.22 31.22s-31.22-13.98-31.22-31.22V574.36c0-11.46 9.29-20.74 20.74-20.74h114.55c17.24 0 31.22 13.98 31.22 31.22-0.01 17.25-13.98 31.23-31.23 31.23z m0-145.7H615.99c-11.45 0-20.74-9.29-20.74-20.74V335.08c0-17.24 13.98-31.22 31.22-31.22s31.22 13.98 31.22 31.22v60.56c0 6.79 5.51 12.29 12.29 12.29h60.56c17.24 0 31.22 13.98 31.22 31.22s-13.98 31.22-31.22 31.22z"
              p-id="3091"
              fill="#ffffff"
            />
          </svg>
        </div>
        <div class="btn" v-else @click="pageFullScreen">
          <svg
            t="1588408931043"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2907"
            width="100%"
            height="100%"
          >
            <path
              d="M804.51 219.49H219.49c-46.16 0-83.58 37.42-83.58 83.58v417.88c0 46.16 37.42 83.58 83.58 83.58h585.03c46.16 0 83.58-37.42 83.58-83.58V303.06c-0.01-46.16-37.43-83.57-83.59-83.57zM261.27 365.74v-41.86c0-11.5 9.32-20.82 20.82-20.82h114.99c17.31 0 31.34 14.03 31.34 31.34 0 17.31-14.03 31.34-31.34 31.34h-60.79c-6.82 0-12.34 5.52-12.34 12.34v60.79c0 17.31-14.03 31.34-31.34 31.34-17.31 0-31.34-14.03-31.34-31.34v-73.13z m135.82 355.2H282.1c-11.5 0-20.81-9.32-20.82-20.82V585.13c0-17.31 14.03-31.34 31.34-31.34 17.31 0 31.34 14.03 31.34 31.34v60.79c0 6.82 5.53 12.34 12.34 12.34h60.79c17.31 0 31.34 14.03 31.34 31.34-0.01 17.31-14.04 31.34-31.34 31.34z m365.64-62.68v41.86c0 11.5-9.32 20.82-20.82 20.82H626.92c-17.31 0-31.34-14.03-31.34-31.34 0-17.31 14.03-31.34 31.34-31.34h60.79c6.82 0 12.34-5.52 12.34-12.34v-60.79c0-17.31 14.03-31.34 31.34-31.34 17.31 0 31.34 14.03 31.34 31.34v73.13z m0-292.52v73.13c0 17.31-14.03 31.34-31.34 31.34-17.31 0-31.34-14.03-31.34-31.34v-60.79c0-6.81-5.53-12.34-12.34-12.34h-60.79c-17.31 0-31.34-14.03-31.34-31.34 0-17.31 14.03-31.34 31.34-31.34h114.99c11.5 0 20.82 9.32 20.82 20.82v41.86z"
              p-id="2908"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
    </div>
    <!-- 全屏按钮 -->
    <div class="btns">
      <div class="btn" @click="fullScreen">
        <svg
          width="86%"
          height="100%"
          viewBox="0 0 252 233"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="margin-top: -10px;"
        >
          <g clip-path="url(#clip0)">
            <circle cx="126.5" cy="109.5" r="14.5" fill="white" />
            <path
              d="M2 103C8 44.2 43.1667 12.1667 60 3.5C64.0743 1.1 67.6976 4.5 69 6.5L109.5 77C109.5 80.5 105.5 81.5 105.5 81.5C95.5 89 92.1667 100.833 91.5 105.5C90.7 107.5 91.5 108.333 89 108.5C62.5 108.667 8.7 108.9 5.5 108.5C2.3 108.1 1.83333 104.667 2 103Z"
              fill="white"
            />
            <path
              d="M59.899 2.88573C11.9767 37.4819 1.81837 83.9538 2.72948 102.865C2.68816 107.594 7.44432 109.032 9.82756 109.159L91.1323 108.983C94.1634 107.233 93.0295 103.269 93.0295 103.269C94.5246 90.8591 103.106 82.0557 106.814 79.145C108.146 77.4522 109.268 77.7283 108.162 75.4799C95.0565 52.4469 68.3586 5.7381 66.4121 3.16682C64.4657 0.595542 61.259 1.90806 59.899 2.88573Z"
              fill="white"
            />
            <path
              d="M250.603 103C244.603 44.2 209.437 12.1667 192.603 3.5C188.529 1.1 184.906 4.5 183.603 6.5L143.103 77C143.103 80.5 147.103 81.5 147.103 81.5C157.103 89 160.437 100.833 161.103 105.5C161.903 107.5 161.103 108.333 163.603 108.5C190.103 108.667 243.903 108.9 247.103 108.5C250.303 108.1 250.77 104.667 250.603 103Z"
              fill="white"
            />
            <path
              d="M192.704 2.88574C240.627 37.4819 250.785 83.9538 249.874 102.865C249.915 107.594 245.159 109.032 242.776 109.159L161.471 108.983C158.44 107.233 159.574 103.269 159.574 103.269C158.079 90.8591 149.497 82.0557 145.789 79.145C144.457 77.4522 143.336 77.7283 144.441 75.4799C157.547 52.4469 184.245 5.73811 186.191 3.16683C188.138 0.595546 191.344 1.90807 192.704 2.88574Z"
              fill="white"
            />
            <path
              d="M71.0341 220.758C125.371 244.017 170.437 228.79 186.178 218.269C190.252 215.869 189.035 211.052 187.917 208.943L145.891 139.342C142.83 137.645 140.016 140.659 140.016 140.659C128.609 145.769 116.643 142.947 112.238 141.268C110.101 140.998 109.76 139.894 108.402 142C95.4089 165.097 69.1221 212.038 67.9206 215.031C66.719 218.023 69.4956 220.096 71.0341 220.758Z"
              fill="white"
            />
            <path
              d="M184.362 218.092C130.871 243.233 85.3005 229.588 69.2019 219.623C65.0463 217.366 66.0945 212.509 67.1381 210.363L106.709 139.337C109.709 137.535 112.627 140.448 112.627 140.448C124.206 145.157 136.066 141.92 140.409 140.088C142.536 139.744 142.838 138.629 144.268 140.686C158.06 163.315 185.969 209.31 187.274 212.259C188.579 215.208 185.877 217.376 184.362 218.092Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="252" height="233" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["size", "wideScreen", "pageFullScreen", "fullScreen"],
  data() {
    return {
      volumeNum: 100,
      isMuted: false,
      isMove: false,
      top: 0,
      height: 100
    };
  },
  methods: {
    volume() {
      // alert(1);
      if (this.volumeNum === 0) {
      } else {
        this.volumeNum = 0;
        this.top = 100;
        this.height = 0;
      }
      this.isMuted = !this.isMuted;
      this.$emit("volumeChange", this.volumeNum);
    },
    offset(curEle) {
      var totalLeft = null,
        totalTop = null,
        par = curEle.offsetParent;
      //首先把自己本身的进行累加
      totalLeft += curEle.offsetLeft;
      totalTop += curEle.offsetTop;

      //只要没有找到body，我们就把父级参照物的边框和偏移量累加
      while (par) {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
          //不是标准的ie8浏览器，才进行边框累加
          //累加父级参照物边框
          totalLeft += par.clientLeft;
          totalTop += par.clientTop;
        }
        //累加父级参照物本身的偏移
        totalLeft += par.offsetLeft;
        totalTop += par.offsetTop;
        par = par.offsetParent;
      }
      return { left: totalLeft, top: totalTop };
    }
  },
  mounted() {
    let volumeBar = this.$refs.volumeBar;
    let volumeReal = this.$refs.volumeReal;
    let wrap = this.$refs.wrap;
    let volumeBall = this.$refs.volumeBall;
    let volumeNum = this.$refs.volumeNum;
    let cha = wrap.offsetHeight;

    let isMove = this.isMove;
    let newT, //音量值
      moveT, //鼠标移动
      mouseY, //鼠标按下拖动的位置
      tops;

    volumeBar.addEventListener("mousedown", e => {
      tops = e.pageY - this.offset(volumeBar).top - volumeBall.offsetHeight / 2;
      if (tops < 0) {
        tops = 0;
      }
      if (tops >= cha) {
        tops = cha;
        this.isMuted = true;
      } else {
        this.isMuted = false;
      }
      this.top = (tops / cha) * 100;
      this.height = (1 - tops / cha) * 100;
      this.volumeNum = parseInt((1 - tops / cha) * 100);

      isMove = true;
      tops = volumeBall.offsetTop;
      mouseY = e.pageY;
      this.$emit("volumeChange", this.volumeNum);
    });

    document.addEventListener("mousemove", e => {
      if (isMove) {
        moveT = e.pageY - mouseY;
        newT = tops + moveT;
        //判断最小值与最大值
        if (newT <= 0) {
          newT = 0;
        }
        if (newT >= cha) {
          newT = cha;
          this.isMuted = true;
        } else {
          this.isMuted = false;
        }
        // console.log(newT)
        this.top = (newT / cha) * 100;
        this.height = (1 - newT / cha) * 100;
        this.volumeNum = parseInt((1 - newT / cha) * 100);
        this.$emit("volumeChange", this.volumeNum);
      }
    });
    document.addEventListener("mouseup", function() {
      isMove = false;
    });
  }
};
</script>

<style scoped>
.right-control {
  display: flex;

  /* width: 200px; */
}
.no-full {
  display: flex;
}
.btns {
  width: 24px;
  height: calc(100% - 10px);
  line-height: 50px;
  margin: 5px 4px;
  padding: 0 2px;
  cursor: pointer;

  /* background-color: springgreen; */
}
.btn {
  width: 100%;
  height: 100%;
  text-align: center;
  /* width: 24px;
  height: calc(100% - 10px);
  margin: 5px;
  padding: 0 2px;
  line-height: 50px;
  cursor: pointer; */

  /* background-color: skyblue; */
}
/* .volume-btn {
  position: relative;
  top: 0;
  left: 0;
} */
.volume-btn:hover .volume {
  visibility: visible;
}
.volume {
  visibility: hidden;
  position: relative;
  bottom: 150px;
  left: 50%;
  width: 30px;
  height: 97px;
  background: #222222;
  border-radius: 2px;
  cursor: default;
  transform: translateX(-50%);
  transition: all ease 0.3s;
}
/*音量数字显示*/
.volumeNum {
  position: relative;
  top: 8px;
  left: 0;
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 12px;
  font-size: 10px;
  color: #edd;
}
/*音量条*/
.zhezao {
  position: absolute;
  left: 0;
  top: 28px;
  width: 100%;
  height: 62%;
}
.max-volume-bar {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  border-radius: 2px;
  background-color: #edd;
  transform: translateX(-50%);
}
.wrap {
  position: relative;
  top: 0;
  height: calc(100% - 12px);
}
.volume-ball {
  position: absolute;
  left: 50%;
  width: 12px;
  height: 12px;
  transform: translate(-50%);
  background: #00a1d6;
  border-radius: 50%;
}
.real-volume-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 2px;
  background-color: #00a1d6;
}
.volumeBar {
  position: absolute;
  left: 0;
  top: 28px;
  width: 100%;
  height: 62%;
  z-index: 99;
  background-color: transparent;
  cursor: pointer;
}
</style>