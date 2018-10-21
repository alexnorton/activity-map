.PHONY: start

start:
	tmux new-session 'sh -c "cd docker && docker-compose up"' \; \
		split-window 'sh -c "cd server && yarn watch"' \; \
		split-window 'sh -c "cd client && yarn start"' \; \
		select-layout even-vertical \; \
		attach
