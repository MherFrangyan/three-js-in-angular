import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EngineService} from './engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit, AfterViewInit {
  @ViewChild('main') main: ElementRef;
  @ViewChild('ipad') ipad: ElementRef;
  @ViewChild('mac') mac: ElementRef;
  @ViewChild('watch') watch: ElementRef;
  @ViewChild('Airpod') Airpod: ElementRef;
  @ViewChild('logo') logo: ElementRef;

  public objects;

  public constructor(private engServ: EngineService) {
    this.objects = [{
      img: '../../assets/model/scene.gltf',
      area: '.container',
      objectSize: 25,
      innerWidth: 500,
      innerHeigh: 400,
      positionZ: 250,
      positionY: 10,
      positionX: 200,
      THREEColor: '#262626',
      rendSizeW: 500,
      rendSizeH: 400,
    },
      {
        img: '../../assets/model1/scene.gltf',
        area: '.ipad_content',
        objectSize: 10,
        innerWidth: 700,
        innerHeigh: 800,
        positionZ: -500,
        positionY: -1000,
        positionX: -100,
        THREEColor: '#262626',
        rendSizeW: 700,
        rendSizeH: 800,
      }, {
        img: '../../assets/model2/scene.gltf',
        area: '.mac_content',
        objectSize: 1,
        innerWidth: 800,
        innerHeigh: 700,
        positionZ: 50,
        positionY: 50,
        positionX: 50,
        THREEColor: '#262626',
        rendSizeW: 800,
        rendSizeH: 700,
      }, {
        img: '../../assets/model3/scene.gltf',
        area: '.watch_content',
        objectSize: 85,
        innerWidth: 800,
        innerHeigh: 700,
        positionZ: 50,
        positionY: 50,
        positionX: 50,
        THREEColor: '#262626',
        rendSizeW: 800,
        rendSizeH: 700,
      }, {
        img: '../../assets/model4/scene.gltf',
        area: '.airpod_content',
        objectSize: 55,
        innerWidth: 800,
        innerHeigh: 700,
        positionZ: 50,
        positionY: 50,
        positionX: 0,
        THREEColor: '#262626',
        rendSizeW: 800,
        rendSizeH: 700,
      },
      {
        img: '../../assets/model5/scene.gltf',
        area: '.logo_content',
        objectSize: 10,
        innerWidth: window.innerWidth,
        innerHeigh: window.innerHeight,
        positionZ: 150,
        positionY: -15,
        positionX: 0,
        THREEColor: '#262626',
        rendSizeW: window.innerWidth,
        rendSizeH: window.innerHeight,
      }
    ];
  }

  public ngOnInit(): void {
    // this.engServ.createScene(this.rendererCanvas1);
    // this.engServ.animate();
    // this.objects.forEach((el) => {
    //   this.engServ.initModel(el, el.img);
    // });
  }

  public ngAfterViewInit() {
    console.log(document.querySelector('.container'));
    this.objects.forEach((el) => {
      this.engServ.initModel(el, el.img);
    });
  }


  onClickScroll(element) {
    switch (element) {
      case 'logo':
        this.logo.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'iPhone':
        this.main.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'iPad':
        this.ipad.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'iMac':
        this.mac.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'Watch':
        this.watch.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'Airpods':
        this.Airpod.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
    }

  }


}
