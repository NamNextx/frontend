import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IQuestion} from '../model/question';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private  http: HttpClient) {
  }

  getListQuestion(): Promise<IQuestion> {
    return this.http.get<IQuestion>('https://6dc1f247-0404-4cfd-8243-7b8413474a14.mock.pstmn.io/test').toPromise();
  }

  getQuestionBuyId(id: number): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${this.API_URL}/question/${id}`);
  }

  createQuestion(post: Partial<IQuestion>): Observable<IQuestion> {
    return this.http.post<IQuestion>(this.API_URL, post);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateQuestion(post: IQuestion): Observable<IQuestion> {
    return this.http.patch<IQuestion>(`${this.API_URL}/${post.id}`, post);
  }
}
