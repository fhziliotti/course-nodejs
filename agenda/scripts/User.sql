CREATE OR REPLACE FUNCTION CONTATO.LISTUSER(
    idUsuario INTEGER,
    pPesquisa VARCHAR(200)
) RETURNS TABLE(
	"id" CONTATO.AGENDA.ID%TYPE,
    "nome" CONTATO.AGENDA.NOME%TYPE,
    "datanascimento" CONTATO.AGENDA.DATANASCIMENTO%TYPE,
    "sexo" CONTATO.AGENDA.SEXO%TYPE,
    "telefones" JSON,
    "enderecos" JSON
) AS $$
    
BEGIN
	RETURN QUERY
    	SELECT 
            a.ID,
            a.NOME,
            a.DATANASCIMENTO,
            a.SEXO,
            (SELECT JSON_AGG(TELEFONESS) FROM (SELECT * FROM CONTATO.TELEFONE t WHERE t.IDAGENDA = a.ID) TELEFONESS) AS TELEFONES,
            (SELECT JSON_AGG(ENDERECOSS) FROM (SELECT * FROM CONTATO.ENDERECO e WHERE e.IDAGENDA = a.ID) ENDERECOSS) AS ENDERECOS
        FROM CONTATO.AGENDA a
        WHERE 
        	CASE WHEN idUsuario IS NULL THEN 
            	TRUE 
            ELSE
            	a.id = idUsuario
            END
            AND
            CASE WHEN pPesquisa IS NULL THEN
            	TRUE
            ELSE
            	a.nome like '%' || pPesquisa || '%'
            END
        ORDER BY
        	a.nome;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION CONTATO.LISTUSER(
    pPesquisa VARCHAR(200)
) RETURNS TABLE(
	"id" CONTATO.AGENDA.ID%TYPE,
    "nome" CONTATO.AGENDA.NOME%TYPE,
    "datanascimento" CONTATO.AGENDA.DATANASCIMENTO%TYPE,
    "sexo" CONTATO.AGENDA.SEXO%TYPE,
    "telefones" JSON,
    "enderecos" JSON
) AS $$
    
BEGIN
	RETURN QUERY
    	SELECT 
            a.ID,
            a.NOME,
            a.DATANASCIMENTO,
            a.SEXO,
            (SELECT JSON_AGG(TELEFONESS) FROM (SELECT * FROM CONTATO.TELEFONE t WHERE t.IDAGENDA = a.ID) TELEFONESS) AS TELEFONES,
            (SELECT JSON_AGG(ENDERECOSS) FROM (SELECT * FROM CONTATO.ENDERECO e WHERE e.IDAGENDA = a.ID) ENDERECOSS) AS ENDERECOS
        FROM CONTATO.AGENDA a
        WHERE 
            CASE WHEN pPesquisa IS NULL THEN
            	TRUE
            ELSE
            	UPPER(a.nome) like UPPER('%' || pPesquisa || '%')
            END
        ORDER BY
        	a.nome;
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.LISTUSER(NULL, NULL);

select * from pg_language;

SELECT * FROM CONTATO.LISTARUSUARIO(1);

CREATE OR REPLACE FUNCTION CONTATO.INSERTUSER(
    pNome CONTATO.AGENDA.NOME%TYPE,
    pDataNascimento CONTATO.AGENDA.DATANASCIMENTO%TYPE,
    pSexo CONTATO.AGENDA.SEXO%TYPE
) RETURNS JSON AS $$

DECLARE
	vReturnError VARCHAR(1000);
BEGIN
	IF EXISTS(SELECT NOME FROM CONTATO.AGENDA a WHERE a.nome = pNome) THEN 
    	RETURN '{"result": "Este nome já existe na Agenda",
        		  "code": 2,
                  "httpCode": 409}';
    END IF;

	INSERT INTO CONTATO.AGENDA (NOME, DATANASCIMENTO, SEXO)
    VALUES (pNome, pDataNascimento, pSexo);
    
    RETURN '{"result": "Contato inserido com sucesso!",
        	  "code": 0,
              "httpCode": 200}';    
              
	EXCEPTION WHEN OTHERS THEN
    	GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
        RETURN '{"result": ' || to_json(vReturnError) ||',
           	      "code": 3,
                  "httpCode": 500}';    
END; $$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION CONTATO.UPDATEUSER(
    pNome CONTATO.AGENDA.NOME%TYPE,
    pDataNascimento CONTATO.AGENDA.DATANASCIMENTO%TYPE,
    pSexo CONTATO.AGENDA.SEXO%TYPE,
    pId CONTATO.AGENDA.ID%TYPE
) RETURNS JSON AS $$

DECLARE
	vReturnError VARCHAR(1000);
BEGIN
	IF NOT EXISTS(SELECT 1 FROM CONTATO.AGENDA a WHERE a.id = pId) THEN 
    	RETURN '{"result": "Este usuário não existe na Agenda!",
        		  "code": 2,
                  "httpCode": 404}';
    END IF;
    
    IF EXISTS(SELECT NOME FROM CONTATO.AGENDA a WHERE a.nome = pNome AND a.id <> pId) THEN 
    	RETURN '{"result": "Este nome já existe na Agenda",
        		  "code": 2,
                  "httpCode": 409}';
    END IF;

	UPDATE CONTATO.AGENDA SET 
    NOME = pNome, 
    DATANASCIMENTO = pDataNascimento, 
    SEXO = pSexo 
    WHERE
    ID = pId;
    
    RETURN '{"result": "Contato alterado com sucesso!",
        	  "code": 0,
              "httpCode": 200}';    
              
	EXCEPTION WHEN OTHERS THEN
    	GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
        RETURN '{"result": ' || to_json(vReturnError) ||',
           	      "code": 3,
                  "httpCode": 500}';    
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.UPDATEUSER ('A', '2017-07-24', 'F', 1);
DROP FUNCTION IF EXISTS CONTATO.UPDATEUSER();

CREATE OR REPLACE FUNCTION CONTATO.REMOVEUSER(
    pId CONTATO.AGENDA.ID%TYPE
) RETURNS JSON AS $$

DECLARE
	vReturnError VARCHAR(1000);
BEGIN
	IF NOT EXISTS(SELECT ID FROM CONTATO.AGENDA a WHERE a.ID = pId) THEN 
    	RETURN '{"result": "Este ID não Existe na Agenda",
        		  "code": 2,
                  "httpCode": 404}';
    END IF;

	DELETE FROM CONTATO.AGENDA
    WHERE ID = pId;
    
    RETURN '{"result": "Contato removido com sucesso!",
        	  "code": 0,
              "httpCode": 200}';    
              
	EXCEPTION WHEN OTHERS THEN
    	GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
        RETURN '{"result": ' || to_json(vReturnError) ||',
           	      "code": 3,
                  "httpCode": 500}';    
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.REMOVEUSER(1);

SELECT ID FROM CONTATO.AGENDA a WHERE a.ID = 1



CREATE OR REPLACE FUNCTION CONTATO.INSERTUSERFULL(
    pNome CONTATO.AGENDA.NOME%TYPE,
    pDataNascimento CONTATO.AGENDA.DATANASCIMENTO%TYPE,
    pSexo CONTATO.AGENDA.SEXO%TYPE,
    pTelefone JSON,
    pEndereco JSON
) RETURNS JSON AS $$

DECLARE
	vReturnError VARCHAR(1000);
    vReturningId INTEGER;
BEGIN
	IF EXISTS(SELECT NOME FROM CONTATO.AGENDA a WHERE a.nome = pNome) THEN 
    	RETURN '{"result": "Este nome já existe na Agenda",
        		  "code": 2,
                  "httpCode": 409}';
    END IF;

	INSERT INTO CONTATO.AGENDA (NOME, DATANASCIMENTO, SEXO)
    VALUES (pNome, pDataNascimento, pSexo) 
    RETURNING ID INTO vReturningId;
    
    -- INSERT DE TELEFONE
    INSERT INTO CONTATO.TELEFONE(
        IDAGENDA,
        DDD,
        TELEFONE,
        WHATS
    )
    SELECT
    	vReturningId,
    	"ddd",
        "telefone",
        "whats"
    FROM
    	json_to_recordset(pTelefone)
    AS x("ddd" INTEGER, "telefone" VARCHAR, "whats" CHAR(1));
    
    -- INSERT DE ENDERECO
    INSERT INTO CONTATO.ENDERECO(
        IDAGENDA,
        RUA,
        NUMERO,
        BAIRRO,
        CEP
    )
    SELECT
    	vReturningId,
    	"rua",
        "numero",
        "bairro",
        "cep"
    FROM
    	json_to_recordset(pEndereco)
    AS x("rua" VARCHAR(50), "numero" VARCHAR(8), "bairro" VARCHAR(20), "cep" VARCHAR(9));
       
    
    RETURN '{"result": "Contato inserido com sucesso!",
        	  "code": 0,
              "httpCode": 200}';    
              
	EXCEPTION WHEN OTHERS THEN
    	GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
        RETURN '{"result": ' || to_json(vReturnError) ||',
           	      "code": 3,
                  "httpCode": 500}';    
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.INSERTUSERFULL('JSON COMPLETAO3', '1995-12-25', 'M', '[{"ddd": 16, "telefone": "993144257", "whats": "S"}]', '[{"rua": "Irenio Grecco", "numero": "4087", "bairro": "Pq São Jorge", "cep": "14405191"}]');

SELECT 
A.ID,
A.NOME,
A.DATANASCIMENTO,
A.SEXO,
(SELECT JSON_AGG(TELEFONESS) FROM (SELECT T.DDD, T.TELEFONE, T.WHATS FROM CONTATO.TELEFONE T WHERE T.IDAGENDA = A.ID) TELEFONESS) AS TELEFONES
FROM CONTATO.AGENDA A
	LEFT JOIN CONTATO.TELEFONE T
    	ON T.IDAGENDA = A.ID
    LEFT JOIN CONTATO.ENDERECO E
    	ON E.IDAGENDA = A.ID
        
        
        -- NOVO UPDATEC

CREATE OR REPLACE FUNCTION CONTATO.UPDATEUSERFULL(
    pId CONTATO.AGENDA.ID%TYPE,
    pNome CONTATO.AGENDA.NOME%TYPE,
    pDataNascimento CONTATO.AGENDA.DATANASCIMENTO%TYPE,
    pSexo CONTATO.AGENDA.SEXO%TYPE,
    pTelefone JSON,
    pEndereco JSON
) RETURNS JSON AS $$

DECLARE
	vReturnError VARCHAR(1000);
BEGIN
    IF NOT EXISTS(SELECT 1 FROM CONTATO.AGENDA a WHERE a.id = pId) THEN 
    	RETURN '{"result": "Este usuário não existe na Agenda!",
        		  "code": 2,
                  "httpCode": 404}';
    END IF;
    
    IF EXISTS(SELECT 1 FROM CONTATO.AGENDA a WHERE a.nome = pNome AND a.id <> pId) THEN 
    	RETURN '{"result": "Este nome já existe na Agenda",
        		  "code": 2,
                  "httpCode": 409}';
    END IF;

	UPDATE CONTATO.AGENDA SET
    	NOME = pNome,
        DATANASCIMENTO = pDataNascimento,
        SEXO = pSexo
    WHERE
    	ID = pId;
        
    -- DELETES DE TELEFONE
    
    DELETE FROM CONTATO.TELEFONE WHERE IDAGENDA = pId;
    
    -- INSERT DE TELEFONE
    INSERT INTO CONTATO.TELEFONE(
        IDAGENDA,
        DDD,
        TELEFONE,
        WHATS
    )
    SELECT
    	pId,
    	"ddd",
        "telefone",
        "whats"
    FROM
    	json_to_recordset(pTelefone)
    AS x("ddd" INTEGER, "telefone" VARCHAR, "whats" CHAR(1));
    
    -- DELETES DE ENDERECO
    DELETE FROM CONTATO.ENDERECO WHERE IDAGENDA = pId;
    
    -- INSERT DE ENDERECO
    INSERT INTO CONTATO.ENDERECO(
        IDAGENDA,
        RUA,
        NUMERO,
        BAIRRO,
        CEP
    )
    SELECT
    	pId,
    	"rua",
        "numero",
        "bairro",
        "cep"
    FROM
    	json_to_recordset(pEndereco)
    AS x("rua" VARCHAR(50), "numero" VARCHAR(8), "bairro" VARCHAR(20), "cep" VARCHAR(9));
       
    
    RETURN '{"result": "Contato alterado com sucesso!",
        	  "code": 0,
              "httpCode": 200}';    
              
	EXCEPTION WHEN OTHERS THEN
    	GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
        RETURN '{"result": ' || to_json(vReturnError) ||',
           	      "code": 4,
                  "httpCode": 500}';    
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.UPDATEUSERFULL(15, 'JSON COMPLETAO6', '1995-12-25', 'M', '[{"ddd": 16, "telefone": "993144257", "whats": "S"}]', '[{"rua": "Irenio Grecco", "numero": "4087", "bairro": "Pq São Jorge", "cep": "14405191"}]');


CREATE OR REPLACE FUNCTION CONTATO.REMOVEUSERFULL(
    pId CONTATO.AGENDA.ID%TYPE
) RETURNS JSON AS $$

DECLARE
	vReturnError VARCHAR(1000);
BEGIN
	IF NOT EXISTS(SELECT 1 FROM CONTATO.AGENDA a WHERE a.id = pId) THEN 
    	RETURN '{"result": "Este usuário não existe na Agenda",
        		  "code": 2,
                  "httpCode": 404}';
    END IF;
    
    DELETE FROM CONTATO.TELEFONE WHERE IDAGENDA = pId;
    DELETE FROM CONTATO.ENDERECO WHERE IDAGENDA = pId;
    DELETE FROM CONTATO.AGENDA WHERE ID = pId;

    RETURN '{"result": "Contato removido com sucesso!",
        	  "code": 0,
              "httpCode": 200}';    
              
	EXCEPTION WHEN OTHERS THEN
    	GET STACKED DIAGNOSTICS vReturnError = MESSAGE_TEXT;
        RETURN '{"result": ' || to_json(vReturnError) ||',
           	      "code": 3,
                  "httpCode": 500}';    
END; $$
LANGUAGE plpgsql;

SELECT * FROM CONTATO.REMOVEUSERFULL(15);