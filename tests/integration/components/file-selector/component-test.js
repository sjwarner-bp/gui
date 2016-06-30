import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('file-selector', 'Integration | Component | file selector', {
  integration: true
});

test('it renders one radio button per file', function(assert) {
  let problem = { files: ['f1', 'f2', 'f3', 'f4'] };
  this.set('problem', problem);

  this.render(hbs`{{file-selector problem=problem}}`);
  assert.equal(this.$(testSelector('files')).length, problem.files.length);
});

test('it shows message when no files available', function(assert) {
  this.set('problem', { files: [] });

  this.render(hbs`{{file-selector problem=problem}}`);
  assert.equal(this.$(testSelector('no-files-msg')).text().trim(), 'No files available');
});

test('it disables submit button if no selection', function(assert) {
  let problem = { files: ['f1'] };
  this.set('problem', problem);

  this.render(hbs`{{file-selector problem=problem}}`);
  assert.equal(this.$(testSelector('files')).length, 1);
  assert.ok(this.$(testSelector('submit-btn')).hasClass('disabled'));
});

test('it sends selected file, problem and dir upon submit', function(assert) {
  let problem = { files: ['f1', 'f2'], dir: '/some/dir', name: 'bob' };
  this.set('problem', problem);
  this.set('selectedFile', 'f2');
  let submit = (file, problem, dir) => {
    assert.equal(file, 'f2');
    assert.equal(problem, 'bob');
    assert.equal(dir, '/some/dir');
  };

  this.set('actions', { submit });

  this.render(hbs`{{file-selector problem=problem selectedFile=selectedFile submit=(action "submit")}}`);
  this.$(testSelector('submit-btn')).click();
});
