import { Renderer, marked } from 'marked';
import removeMarkdown from 'remove-markdown';
import sanitize from 'sanitize-html';

// TODO: Implement markdown tokenizer

marked.setOptions({
	renderer: new (class extends Renderer {
		code(code: string, language: string | undefined, isEscaped: boolean): string {
			switch(language) {
				case 'js': {
					language = 'javascript';
					
					break;
				}

				case 'ts': {
					language = 'typescript';

					break;
				}

				case 'rs': {
					language = 'rust';

					break;
				}
			}

			return super.code(code, language, isEscaped);
		}
	})
});

export function getHtml(markdown: string): string {
	return sanitize(marked(markdown));
}

export function getPlaintext(markdown: string): string {
	return removeMarkdown(markdown);
}