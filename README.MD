# Tree View Project

Este é um projeto de visualização hierárquica de ativos e locais usando React e Material-UI (MUI). O projeto permite a construção e exibição de uma árvore de dados baseada em ativos e locais, com suporte para filtragem e visualização de status.

## Funcionalidades

- **Visualização Hierárquica**: Exibe uma árvore de ativos e locais em uma estrutura hierárquica.
- **Filtragem**: Permite a filtragem de nós com base em status, tipo de sensor e texto.
- **Interatividade**: Oferece interação com os nós da árvore para expandir ou recolher subnós.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI (MUI)**: Conjunto de componentes React para uma interface de usuário responsiva e moderna.
- **Hooks do React**: Utilizados para gerenciar o estado e os efeitos colaterais.

## Acesso Online

Visualize o projeto em [https://desafio-tractian-pi.vercel.app/](https://desafio-tractian-pi.vercel.app/).

## Vídeo de Demonstração

Confira a demonstração do projeto no vídeo abaixo:

[Assista ao vídeo](https://drive.google.com/file/d/1qmuqMvZVgc93mZ-8RX3kdK_jlQ6Baz9z/view?usp=sharing)

## Pontos de Melhoria

- Um ponto importante a ser apontado é o filtro de texto quando existem muitos componentes em tela, o valor demora pouco mais de 1 segundo para ser carregado, para resolver isso eu implementaria a virtualização da listagem
- Trabalhar melhor os componentes para reutilizar código