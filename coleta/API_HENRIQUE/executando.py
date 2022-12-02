from crawlerpythonRA import ReclameAqui

arquivo1 = ReclameAqui()
n_paginas2 = 6
arquivo1.__init__()

i = 1 
while i < n_paginas2:
    arquivo1.extrair_informacoes(n_paginas = i)
    i+=1


