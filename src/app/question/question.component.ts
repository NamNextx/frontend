import {Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import {IAnswer, IQuestion} from '../model/question';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../service/question.service';
import {AppComponent} from '../app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})


export class QuestionComponent implements OnInit {
  listQuestion: IQuestion;
  listAnswer: IAnswer;
  formQuestion: FormGroup;
  question: IQuestion;
  count = 1;
  flagSvenData = false;
  dapAn: string[] = new Array('A)', 'B)', 'C)', 'D)');

  @Output() sendData = new EventEmitter<boolean>();

  constructor(
    private activeRouter: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {

    this.questionService.getListQuestion().then(list =>
      this.listQuestion = list
    );


    this.formQuestion = this.fb.group(
      {
        answer: ''
      }
    );

    this.questionService.getAnswerBuyId(1).subscribe(data => {
        this.listAnswer = data;
      },
      error => {
        console.log(error);
        this.listAnswer = null;
      });
  }

  onSubmit() {
    /*

        console.log(this.count);
        console.log(this.listQuestion[this.count - 1]);
        console.log('Cai minh chon' + this.formQuestion.value.answer);
        console.log('ket qua' + this.question.answer.id);
    */
    console.log(this.listAnswer);


    if (this.formQuestion.value.answer == this.question.answer.id) {
      this.question = this.listQuestion[this.count];
      this.questionService.getAnswerBuyId(this.question.answer.id).subscribe(data => {
          this.listAnswer = data;
        },
        error => {
          console.log(error);
          this.listAnswer = null;
        });
      this.flagSvenData = true;
      this.sendData.emit(this.flagSvenData);

      console.log('Dap an dung');
      this.count++;


    } else {
      this.flagSvenData = false;
      this.sendData.emit(this.flagSvenData);
      this.count = 1;
      this.question = this.listQuestion[this.count - 1];
      this.ngOnInit();
    }
  }

  getData() {
    this.question = this.listQuestion[this.count - 1];

  }
}
