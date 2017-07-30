import { FileUploadPage } from './app.po';

describe('file-upload App', () => {
  let page: FileUploadPage;

  beforeEach(() => {
    page = new FileUploadPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
