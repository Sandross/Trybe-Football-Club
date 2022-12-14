import * as express from 'express';
import loginRouter from './routes/loginRoute';
import teamRouter from './routes/teamRoute';
import matchRouter from './routes/matchRoute';
import leaderBoardRouter from './routes/leaderBoardRoute';
import ErrorMiddleware from './utils/errHandlr';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(teamRouter);
    this.app.use(loginRouter);
    this.app.use(matchRouter);
    this.app.use(leaderBoardRouter);
    this.app.use(ErrorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
