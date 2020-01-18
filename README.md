# dsbt
Discord Bot - MercadoLivre SDK. Winwin

O intuito desse projeto seria, rodar uma SDK localmente e conseguir executar a tokenização de um cartão de crédito, e automatizar de forma
rápida os pagamentos a uma certa conta de vendedor. 
Saindo do ambiente de teste, a tokenização utilizada para os cartões, permanecia a mesma, uma falha crítica.
Então, ao se aplicar essa ideia numa situação fora do ambiente de teste, seria possível executar pagamentos em sequência sem a necessidade
de existir de fato um produto, e apenas receber o pagamento para conta vendedora.

E por que utilizar o Discord para tal aplicação?
O discord roda em Node.JS, permitindo multithreading de maneira eficiente.
Resultando em pagamentos mais rápidos, e sem a necessidade de uma conta para cada pagamento. 

Não sei se essa falha já foi corrigida, porém obviamente o projeto completo não está aqui.
Have fun.
