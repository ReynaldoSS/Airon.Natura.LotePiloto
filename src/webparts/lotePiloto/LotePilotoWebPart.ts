import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './LotePilotoWebPart.module.scss';
import * as strings from 'LotePilotoWebPartStrings';

export interface ILotePilotoWebPartProps {
  description: string;
}

export default class LotePilotoWebPart extends BaseClientSideWebPart<ILotePilotoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.lotePiloto }">
        <div class="${ styles.container }">
        <table>
          <tbody>
              <tr>
                  <td>
                      <div id="lblLabelId">ID</div>
                  </td>
                  <td>
                      <div id="lblLabelTitle">* Título</div>
                  </td>
                  <td>
                      <div id="lblLabelStatus">Status</div>
                  </td>
              </tr>
              <tr>
                  <td>
                      <div id="txtValueId">123</div>
                      <div id="lblMsgId"></div>
                  </td>
                  <td>
                      <div id="txtValueTitle"><input id="agTitle" type="text" /></div>
                      <div id="lblMsgTitle"></div>
                  </td>
                  <td>
                      <div id="lblValueStatus"><input id="agStatus" type="text" /></div>
                      <div id="lblMsgTitle"></div>
                  </td>
              </tr>
          </tbody>
      </table>
      <div id="tabs" class="${ styles.classTabs}">
          <ul>
              <li><a href="#tab-Produto">Produto</a></li>
              <li><a href="#tab-Agendamento">Agendamento</a></li>
              <li><a href="#tab-Responsaveis">Responsáveis</a></li>
              <li><a href="#tab-Acompanhamento">Acompanhamento</a></li>
              <li><a href="#tab-Historico">Histórico</a></li>
          </ul>
          <div id="tab-Produto">
              <h1>Produto</h1>
              <div>
                  <div class="${ styles.title}">Linha do produto</div>
                  <div>
                      <select id="linhaDoProduto"></select>
                  </div>
              </div>
              <div id="produtoControlDescricao">
                  <div id="produtoDescricaoLabel" class="${ styles.title}">Descrição do produto</div>
                  <div id="produtoDescricaoField">
                      <input id="produtoDescricao" runat="server" />
                  </div>
              </div>
              <div id="produtoControlProjeto">
                  <div id="produtoProjetoLabel" class="${ styles.title}">Projeto</div>
                  <div id="produtoProjetoField">
                      <input id="produtoProjeto" runat="server" />
                  </div>
              </div>
              <div>
                  <div class="${ styles.title}">Categoria do projeto</div>
                  <div>
                      <select id="categoriaDoProjeto"></select>
                  </div>
              </div>
              <div id="produtoControlTipoLote">
                  <div id="produtoTipoLoteLabel" class="${ styles.title}">Tipo de Lote</div>
                  <div id="produtoTipoLoteField">
                      <select></select>
                  </div>
              </div>
              <div id="produtoControlFormula">
                  <div id="produtoFormulaLabel" class="${ styles.title}">Fórmula</div>
                  <div id="produtoFormulaField">
                      <input id="produtoFormula" runat="server" />
                  </div>
              </div>
              <div id="produtoControlQuantidade">
                  <div id="produtoQuantidadeLabel" class="${ styles.title}">Quantidade (peças)</div>
                  <div id="produtoQuantidadeField">
                      <input id="produtoQuantidade" runat="server" />
                  </div>
              </div>
              <div id="produtoControlMotivo">
                  <div id="produtoMotivoLabel" class="${ styles.title}">Motivo</div>
                  <div id="produtoMotivoField">
                      <select></select>
                  </div>
              </div>
              <div id="produtoControlEnvioAmostras">
                  <div id="produtoEnvioAmostrasLabel" class="${ styles.title}">Solicitação de envio de amostras</div>
                  <label class="${ styles.switch}">
                      <input id="produtoEnvioAmostras" type="checkbox">
                      <span class="${ styles.slider} ${ styles.round}"></span>
                  </label>
              </div>
              <div id="produtoControlResponsavelAmostra">
                  <div id="produtoResponsavelAmostraLabel" class="${ styles.title}">Responsável pela amostra</div>
                  <div id="produtoResponsavelAmostraField">
                      <input id="produtoResponsavelAmostra" runat="server" />
                  </div>
              </div>
              <div id="produtoControlQuantidadeAmostra">
                  <div id="produtoQuantidadeAmostraLabel" class="${ styles.title}">Quantidade de amostras</div>
                  <div id="produtoQuantidadeAmostraField">
                      <input id="produtoQuantidadeAmostra" runat="server" />
                  </div>
              </div>
          </div>
          <div id="tab-Agendamento">
              <h1>Agendamento</h1>
              <div id="agendamentoControlFabrica">
                  <div id="agendamentoFabricaLabel" class="${ styles.title}">Fábrica</div>
                  <div id="agendamentoFabricaField">
                      <select></select>
                  </div>
              </div>
              <div id="agendamentoControlLinhaEquipamento">
                  <div id="agendamentoLinhaEquipamentoLabel" class="${ styles.title}">Linha ou Equipamento</div>
                  <div id="agendamentoLinhaEquipamentoField">
                      <select></select>
                  </div>
              </div>
              <div id="agendamentoControlCentroCusto">
                  <div id="agendamentoCentroCustoLabel" class="${ styles.title}">Centro de custo – PEP – NT</div>
                  <div id="agendamentoCentroCustoField">
                      <input id="agendamentoCentroCusto" runat="server" />
                  </div>
              </div>
              <div id="agendamentoControlGrauComplexidade">
                  <div id="agendamentoGrauComplexidadeLabel" class="${ styles.title}">Grau de complexidade</div>
                  <div id="agendamentoGrauComplexidadeField">
                      <select></select>
                  </div>
              </div>
              <div id="agendamentoControlDataInicioProgramado">
                  <div id="agendamentoDataInicioProgramadoLabel" class="${ styles.title}">Início programado</div>
                  <div id="agendamentoDataInicioProgramadoField">
                      <input id="agendamentoDataInicioProgramado" runat="server" />
                  </div>
                  <div id="agendamentoDataInicioProgramadoHora">
                      <select></select>
                  </div>
                  <div id="agendamentoDataInicioProgramadoMinuto">
                      <select></select>
                  </div>
              </div>
              <div id="agendamentoControlDuracaoHora">
                  <div id="agendamentoDuracaoHoraLabel" class="${ styles.title}">Duração (hh)</div>
                  <div id="agendamentoDuracaoHoraField">
                      <input id="agendamentoDuracaoHora" runat="server" />
                  </div>
              </div>
              <div id="agendamentoControlDuracaoMinuto">
                  <div id="agendamentoDuracaoMinutoLabel" class="${ styles.title}">Duração (mm)</div>
                  <div id="agendamentoDuracaoMinutoField">
                      <input id="agendamentoDuracaoMinuto" runat="server" />
                  </div>
              </div>
              <div id="agendamentoControlFim">
                  <div id="agendamentoFimLabel" class="${ styles.title}">Fim programado (calculado)</div>
                  <div id="agendamentoFimField">
                      <div id="agendamentoFim"></div>
                  </div>
              </div>
              <div id="agendamentoControlObservacoes">
                  <div id="agendamentoObservacoesLabel" class="${ styles.title}">Observações</div>
                  <div id="agendamentoObservacoesField">
                      <input id="agendamentoObservacoes" runat="server" />
                  </div>
              </div>
          </div>
          <div id="tab-Responsaveis">
              <div>
                  <div class="${ styles.title}">Tipo de Lote</div>
                  <div>
                      <select id="tipoDeLote">
                          <option value="Brinde">Brinde</option>
                          <option value="Envase">Envase</option>
                          <option value="Fabricação">Fabricação</option>
                          <option value="Picking">Picking</option>
                      </select>
                  </div>
              </div>
              <div id="tabsResponsaveis" class="${ styles.classTabs}">
                  <ul>
                      <li><a href="#tab-RespDLPCL">DL/PCL</a></li>
                      <li><a href="#tab-RespEngEnv">Eng. Envase</a></li>
                      <li><a href="#tab-RespEngFab">Eng. Fabricação</a></li>
                      <li><a href="#tab-RespInvDF">Inov. DF</a></li>
                      <li><a href="#tab-RespQual">Qualidade</a></li>
                      <li><a href="#tab-RespFab">Fábrica</a></li>
                  </ul>
                  <div id="tab-RespDLPCL">
                      <h1>DL/PCL</h1>
                  </div>
                  <div id="tab-RespEngEnv">
                      <h1>Eng. Envase</h1>
                  </div>
                  <div id="tab-RespEngFab">
                      <h1>Eng. Fabricação</h1>
                  </div>
                  <div id="tab-RespInvDF">
                      <h1>Inov. DF</h1>
                  </div>
                  <div id="tab-RespQual">
                      <h1>Qualidade</h1>
                  </div>
                  <div id="tab-RespFab">
                      <h1>Fábrica</h1>
                  </div>
              </div>
          </div>
          <div id="tab-Acompanhamento">
              <div id="tabsAcompanhamento" class="${ styles.classTabs}">
                  <ul>
                      <li><a href="#tab-AcompDLPCL">DL/PCL</a></li>
                      <li><a href="#tab-AcompEngEnv">Eng. Envase</a></li>
                      <li><a href="#tab-AcompEngFab">Eng. Fabricação</a></li>
                      <li><a href="#tab-AcompInvDE">Inov. DE</a></li>
                      <li><a href="#tab-AcompInvDF">Inov. DF</a></li>
                      <li><a href="#tab-AcompQual">Qualidade</a></li>
                      <li><a href="#tab-AcompFab">Fábrica</a></li>
                      <li><a href="#tab-AcompMeioAmb">Meio Ambiente</a></li>
                  </ul>
                  <div id="tab-AcompDLPCL">
                      <h1>DL/PCL</h1>
                  </div>
                  <div id="tab-AcompEngEnv">
                      <h1>Eng. Envase</h1>
                  </div>
                  <div id="tab-AcompEngFab">
                      <h1>Eng. Fabricação</h1>
                  </div>
                  <div id="tab-AcompInvDE">
                      <h1>Inov. DE</h1>
                  </div>
                  <div id="tab-AcompInvDF">
                      <h1>Inov. DF</h1>
                  </div>
                  <div id="tab-AcompQual">
                      <h1>Qualidade</h1>
                  </div>
                  <div id="tab-AcompFab">
                      <h1>Fábrica</h1>
                  </div>
                  <div id="tab-AcompMeioAmb">
                      <h1>Meio Ambiente</h1>
                  </div>
              </div>
          </div>
          <div id="tab-Historico">
              <h1>Histórico</h1>
          </div>
        </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
