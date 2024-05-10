import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-frames',
  standalone: true,
  imports: [NgIf],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent {

  @Input()
  frameSrc!: string; // Replace with the path to your frame image

  @Input() edit: boolean = false;
  @Input() save: boolean = false;
  @Input() reset: boolean = false;

  @Output() file = new EventEmitter<any>();
  @Output() image = new EventEmitter<any>();

  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  canvas1Context!: fabric.Canvas;

  imageSrc: string | ArrayBuffer | null = null;
  imageX: number = 0;
  imageY: number = 0;
  isDragging: boolean = false;

  hide: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['save']) {
      if (this.save) {


        this.captureScreenshot();
        console.log('Saving screenshot')
      }
    }
    if (changes['reset']) {
      if (this.reset) {
        this.reset = false;
        this.canvas1Context.clear();
        this.hide = false;

      }
    }
  }

  canvasWidth: number = 0;
  canvasHeight: number = 0;



  // Add the following method to your component class
  mouseEnterHandler() {
    this.canvas1.nativeElement.focus(); // Focus on the canvas when mouse enters
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

    const overlayImage = new Image();
    overlayImage.src = this.frameSrc;
    overlayImage.onload = () => {
      this.canvasWidth = 500;
      this.canvasHeight = 600;
    };
  }

  ngAfterViewInit() {

    this.canvas1Context = new fabric.Canvas(this.canvas1.nativeElement, {
      selection: false, // Disable Fabric.js built-in selection mechanism
    });
  }

  handleFileInput(event: any) {
    this.canvas1Context.setWidth(this.canvasWidth);
    this.canvas1Context.setHeight(this.canvasHeight);
    const file = event.target.files[0];
    this.image.emit(event);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.addImageToCanvas();
      };
      reader.readAsDataURL(file);
    }
  }

  private addImageToCanvas(): void {
    this.hide = true;
    this.canvas1Context.clear();
    if (this.imageSrc)
      fabric.Image.fromURL(this.imageSrc.toString(), (img) => {
        let width = img.width ?? 1;
        let height = img.height ?? 1;

        // Calculate the scale factors to fit the image within the canvas
        const scaleFactorWidth = this.canvas1.nativeElement.width / width;
        const scaleFactorHeight = this.canvas1.nativeElement.height / height;
        const scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight);

        // Set the scale factors to resize the image
        img.scaleToWidth(width * scaleFactor);
        img.scaleToHeight(height * scaleFactor);

        img.set({
          left: 0,
          top: 0,
          hasControls: true, // Enable Fabric.js controls for easy movement
          selectable: true    // Allow selection of the image
        });

        img.on('mousedown', (event) => {
          const target = event.target;
          console.log('Image selected:', target);
          if (target)
            this.canvas1Context.setActiveObject(target);
        });

        this.canvas1Context.add(img);
        this.captureScreenshot()
      });
  }

  mouseDownHandler(event: MouseEvent) {
    this.isDragging = true;
  }

  mouseMoveHandler(event: MouseEvent) {
    if (this.isDragging) {
      const rect = this.canvas1.nativeElement.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.imageX = mouseX;
      this.imageY = mouseY;

      this.canvas1Context.renderAll(); // Render canvas to reflect changes
    }
  }

  mouseUpHandler(event: MouseEvent) {
    this.isDragging = false;
  }

  captureScreenshot() {
    this.save = false;
    const elementToCapture = this.elementRef.nativeElement.querySelector('#canvas-container');

    setTimeout(() => {
      html2canvas(elementToCapture, {
        allowTaint: true,
        useCORS: true
      })
        .then(canvas => {
          // Convert canvas to blob
          canvas.toBlob(blob => {

            const data = {
              file: blob,
              message: 'success'
            }

            this.file.emit(data);

            console.log("saved")

          }, 'image/png'); // Specify the MIME type of the image (e.g., 'image/png')
        });

    }, 500)
  }
}